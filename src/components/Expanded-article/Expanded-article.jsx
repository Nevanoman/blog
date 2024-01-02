import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Spin, Popconfirm } from 'antd'
import ReactMarkdown from 'react-markdown'
import { fetchArticle, deleteArticle } from '../../store/articleReducer'
import classesArticle from '../Item-article/Item-article.module.scss'
import classes from './Expanded-article.module.scss'
import Favorites from '../Favorites'

function ExpandedArticle() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const article = useSelector((state) => state.article.article)
  const loading = useSelector((state) => state.article.loading)
  const error = useSelector((state) => state.article.error)
  const favorited = useSelector((state) => state.articles.favorites)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(fetchArticle(id))
  }, [id, dispatch, favorited])

  function onClickDelete() {
    dispatch(
      deleteArticle({
        token: user.token,
        id,
      })
    )
  }

  function getTags(arr) {
    if (!arr) {
      return null
    }

    return (
      <>
        {arr.map((tag) => (
          <span className={classesArticle.tag} key={Math.random().toString(36).substring(2)}>
            {tag}
          </span>
        ))}
      </>
    )
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div className={classes.error}>Произошла ошибка загрузки!</div>
  }

  return (
    <div className={classes.content}>
      <div className={classes.article}>
        <Favorites
          text={article.title}
          favoritesCount={article.favoritesCount}
          slug={id}
          favorited={article.favorited}
        />
        <div>{getTags(article.tagList)}</div>
        <div className={classes.body}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
        {user && user.username === article.author.username && (
          <>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={onClickDelete}
              okText="Yes"
              cancelText="No"
              placement="right"
            >
              <button type="button" className={classes.delete}>
                Delete
              </button>
            </Popconfirm>

            <Link to="edit">
              <button type="button" className={`${classes.delete} ${classes.edit}`}>
                Edit
              </button>
            </Link>
          </>
        )}
        <div className={classesArticle.user}>
          <div>
            <div className={classesArticle.username}>{article.author.username}</div>
            <div className={classesArticle.data}>{format(article.updatedAt, 'MMMM dd, yyyy')}</div>
          </div>
          <img className={classesArticle.img} src={article.author.image} alt="user img" />
        </div>
      </div>
    </div>
  )
}
export default ExpandedArticle
