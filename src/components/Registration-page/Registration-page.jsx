import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from './Registration-page.module.scss'
import classesLogin from '../Login-page/Login-page.module.scss'
import { fetchToken } from '../../store/registrationReducer'

function RegistrationPage() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const params = {
      user: {
        username: String(data.username),
        email: String(data.email),
        password: String(data.password),
      },
    }

    dispatch(fetchToken(params))
    reset()
  }
  const password = watch('password')
  // const checkbox = 
  watch('checkbox', true)

  const validatePassword = (value) => value === password || 'Пароли не совпадают'

  const validateCheckbox = (value) => value === true || 'Необходимо согласие на обработку персональных данных'

  const toggle = (e) => {
    const checkboxes = document.querySelector(`.${classes['check-input']}`)
    checkboxes.checked = e.target.checked
  }

  return (
    <div className={classesLogin.content}>
      <div className={classesLogin.form}>
        <h3>Create new account</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={classesLogin.label}>
            Username*
            <input
              type="text"
              placeholder="Username"
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
								validate: {
									noSpace: value => !/\s/.test(value) || 'Никнейм не должен содержать пробелы!',
								},
              })}
              className={`${classesLogin.input} ${errors.username ? classesLogin.errorInput : ''}`}
            />
            <div>
              {errors?.username && <p className={classesLogin.errorMessage}>{errors?.username?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            Email address*
            <input
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Поле обязательно для заполнения!',
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.\w+$/,
                  message: 'email должен быть корректным почтовым адресом!',
                },
								validate: {
									noSpace: value => !/\s/.test(value) || 'Email не должен содержать пробелы!',
								},
              })}
              className={`${classesLogin.input} ${errors.email ? classesLogin.errorInput : ''}`}
            />
            <div>
              {errors?.email && <p className={classesLogin.errorMessage}>{errors?.email?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            Password*
            <input
              type="password"
              required
              placeholder="Password"
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
								validate: {
									noSpace: value => !/\s/.test(value) || 'Пароль не должен содержать пробелы!',
								},
              })}
              className={`${classesLogin.input} ${errors.password ? classesLogin.errorInput : ''}`}
            />
            <div>
              {errors?.password && <p className={classesLogin.errorMessage}>{errors?.password?.message || 'Error'}</p>}
            </div>
          </label>

          <label className={classesLogin.label}>
            Repeat Password*
            <input
              type="password"
              required
              placeholder="Password"
              {...register('passwordRepeat', {
                required: 'Поле обязательно для заполнения!',
                validate: validatePassword,
              })}
              className={`${classesLogin.input} ${errors.passwordRepeat ? classesLogin.errorInput : ''}`}
            />
            <div>
              {errors?.passwordRepeat && (
                <p className={classesLogin.errorMessage}>{errors?.passwordRepeat?.message || 'Error'}</p>
              )}
            </div>
          </label>

          <label className={classes['input-filter']}>
            <input
              type="checkbox"
              className={classes['check-input']}
              onChange={toggle}
              defaultChecked
              {...register('checkbox', {
                validate: validateCheckbox,
              })}
            />
            <span className={classes['check-box']} />I agree to the processing of my personal information
            <div>
              {errors?.checkbox && <p className={classesLogin.errorMessage}>{errors?.checkbox?.message || 'Error'}</p>}
            </div>
          </label>

          <div className={classesLogin.container}>
            <input type="submit" value="Create" className={classesLogin.buttonSabmit} disabled={!isValid} />

            <p className={classesLogin.text}>
              Already have an account?{' '}
              <NavLink to="/sign-in">
                <span>Sign In.</span>
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default RegistrationPage