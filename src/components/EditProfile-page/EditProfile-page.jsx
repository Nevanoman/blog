import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import classesLogin from '../Login-page/Login-page.module.scss'
import { changeRegistration, fetchUpdatedUser } from '../../store/registrationReducer'

function EditProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [textName, setTextName] = useState('' && user.username)
  const [textEmail, setTextEmail] = useState('' && user.email)

  const dispatch = useDispatch()
  const registration = useSelector((state) => state.registration.registration)
  const data = localStorage.getItem('registration')

  useEffect(() => {
    if (data) {
      dispatch(changeRegistration(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (params) => {
    const newParams = {
      user: {
        email: String(params.email),
        username: String(params.username),
        bio: 'I work at State Farm.',
        image: String(params.image),
        password: String(params.password),
      },
    }
    dispatch(
      fetchUpdatedUser({
        token: user.token,
        params: newParams,
      })
    )
    reset()
  }

  const handleInputChangeName = (e) => {
    setTextName(e.target.value)
  }

  const handleInputChangeEmail = (e) => {
    setTextEmail(e.target.value)
  }

  if (!registration) {
    return <div />
  }

  return (
    <div className={classesLogin.content}>
      <div className={classesLogin.form}>
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={classesLogin.label}>
            Username
            <input
              type="text"
              value={textName}
              {...register('username', {
                required: 'Поле обязательно для заполнения!',
                minLength: {
                  value: 3,
                  message: 'Поле должно содержать от 3 до 20 символов (включительно)',
                },
                maxLength: {
                  value: 20,
                  message: 'Поле должно содержать от 3 до 20 символов (включительно)',
                },
              })}
              className={`${classesLogin.input} ${errors.username ? classesLogin.errorInput : ''}`}
              onChange={handleInputChangeName}
            />
            <div>
              {errors?.username && <p className={classesLogin.errorMessage}>{errors?.username?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            Email address
            <input
              type="email"
              value={textEmail}
              {...register('email', {
                required: 'Поле обязательно для заполнения!',
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.\w+$/,
                  message: 'email должен быть корректным почтовым адресом!',
                },
              })}
              className={`${classesLogin.input} ${errors.email ? classesLogin.errorInput : ''}`}
              onChange={handleInputChangeEmail}
            />
            <div>
              {errors?.email && <p className={classesLogin.errorMessage}>{errors?.email?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            New password
            <input
              type="password"
              required
              placeholder="New password"
              {...register('password', {
                required: 'Поле обязательно для заполнения!',
                minLength: {
                  value: 3,
                  message: 'Поле должно содержать от 6 до 40 символов (включительно)',
                },
                maxLength: {
                  value: 40,
                  message: 'Поле должно содержать от 6 до 40 символов (включительно)',
                },
              })}
              className={`${classesLogin.input} ${errors.password ? classesLogin.errorInput : ''}`}
            />
            <div>
              {errors?.password && <p className={classesLogin.errorMessage}>{errors?.password?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>Avatar image (url)</label>
          <input
            type="url"
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: 'avatar image должен быть корректным url',
              },
            })}
            className={`${classesLogin.input} ${errors.password ? classesLogin.errorInput : ''}`}
          />
          <div>{errors?.image && <p className={classesLogin.errorMessage}>{errors?.image?.message || 'Error'}</p>}</div>
          <input type="submit" value="Save" className={classesLogin.buttonSabmit} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
export default EditProfilePage
