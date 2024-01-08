import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createArticle, fetchArticle, updateArticle } from '../../store/articleReducer'
import classesLogin from '../Login-page/Login-page.module.scss'
import classes from './Create-article.module.scss'

function CreateArticle({ action }) {
  const article = useSelector((state) => state.article.article)
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const [title, setTitle] = useState(article?.title || '')
  const [description, setDescription] = useState(article?.description || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (action) {
      dispatch(fetchArticle(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (action && article) {
      setTitle(article.title || '')
      setDescription(article.description || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  function findTags(arr) {
    const result = []
    arr.map((obj) => result.push(obj.tag))
    return result
  }

  const onSubmit = async (params) => {
    const tags = findTags(params.tagList)

    if (action) {
      const newParams = {
        article: {
          title: String(params.title),
          description: String(params.description),
          body: String(params.body),
          tagList: tags,
        },
      }
      await dispatch(
        updateArticle({
          id,
          token: user.token,
          params: newParams,
        })
      )
    } else {
      const newParams = {
        article: {
          title: String(params.title),
          description: String(params.description),
          body: String(params.body),
          tagList: tags,
        },
      }
      await dispatch(
        createArticle({
          token: user.token,
          params: newParams,
        })
      )
      reset()
    }
    navigate('/')
  }
  const handleInputChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleInputChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  return (
    <div className={classesLogin.content}>
      <div className={classes.form}>
        <h3>Create Article</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={classesLogin.label}>
            Title
            <input
              value={title}
              placeholder="Title"
              {...register('title', {
                required: 'Поле обязательно для заполнения!',
                validate: {
                  noSpace: (value) => value.trim() !== '' || 'Поле не должно состоять только из пробелов!',
                },
              })}
              className={`${classes.input} ${errors.title ? classes.errorInput : ''}`}
              onChange={handleInputChangeTitle}
            />
            <div>
              {errors?.title && <p className={classesLogin.errorMessage}>{errors?.title?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            Short description
            <input
              value={description}
              placeholder="Title"
							defaultValue={action && article ? article.body : null}
              {...register('description', {
                required: 'Поле обязательно для заполнения!',
                validate: {
                  noSpace: (value) => value.trim() !== '' || 'Поле не должно состоять только из пробелов!',
                },
              })}
              className={`${classes.input} ${errors.description ? classes.errorInput : ''}`}
              onChange={handleInputChangeDescription}
            />
            <div>
              {errors?.description && (
                <p className={classesLogin.errorMessage}>{errors?.description?.message || 'Error'}</p>
              )}
            </div>
          </label>

          <label className={classesLogin.label}>
            Text
            <textarea
              defaultValue={action && article ? article.body : null}
              {...register('body', {
                required: 'Поле обязательно для заполнения!',
                validate: {
                  noSpace: (value) => value.trim() !== '' || 'Поле не должно состоять только из пробелов!',
                },
              })}
              className={`${classes.input} ${classes.text} ${errors.body ? classes.errorInput : ''}`}
            />
            <div>{errors?.body && <p className={classesLogin.errorMessage}>{errors?.body?.message || 'Error'}</p>}</div>
          </label>

          <div className={classesLogin.label}>Tags</div>

          {fields.map((tag, index) => (
            <div key={index}>
              <input
                placeholder="Tags"
                className={`${classes.input} ${classes.tags}`}
                {...register(`tagList.${index}.tag`, {
                  required: 'Поле обязательно для заполнения!',
                  validate: {
                    noSpace: (value) => value.trim() !== '' || 'Поле не должно состоять только из пробелов!',
                  },
                })}
              />
              <button
                type="button"
                className={classes.button}
                onClick={() => {
                  remove(index)
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            className={`${classes.button} ${classes.buttonAdd}`}
            onClick={() => {
              append()
            }}
          >
            Add tag
          </button>

          <input type="submit" value="Send" className={classesLogin.buttonSabmit} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}

export default CreateArticle
