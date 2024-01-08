import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import defaultImg from './default-img.png'
import classes from './Header.module.scss'
import { changeRegistration, logOut } from '../../store/registrationReducer'
import { changePage } from '../../store/articlesReducer';


// cartenoire

function Header() {
  const dispatch = useDispatch()
  const registration = useSelector((state) => state.registration.registration)
  const updatedUser = useSelector((state) => state.registration.updatedUser)
  const data = localStorage.getItem('registration')
  let user = null

  useEffect(() => {
    if (data) {
      dispatch(changeRegistration(data))
      if (registration) {
        user = JSON.parse(localStorage.getItem('user'))
      }
    }
  }, [dispatch, updatedUser])

	const navigate = useNavigate()

  if (registration) {
    user = JSON.parse(localStorage.getItem('user'))

    function onClickLogOut() {
      dispatch(logOut())
    }

		function onClickRealworldBlog() {
      user = JSON.parse(localStorage.getItem('user'));
      dispatch(changePage(1));
      navigate('/');
    }

    return (
      <>
        <div className={classes.header}>
          <Link to="articles/">
					<span onClick={onClickRealworldBlog} onKeyDown={onClickRealworldBlog} role="button" tabIndex={0}>Realworld Blog</span>
          </Link>
          <div>
            <Link to="new-article">
              <button type="button" className={classes.create}>
                Create article
              </button>
            </Link>
            <Link to="profile">
              <span className={classes.userName}>{user.username}</span>
              <img className={classes.img} alt="user img" src={user.image ? user.image : defaultImg} />
            </Link>

            <Link to="/sign-in">
              <button type="button" className={classes.logOut} onClick={onClickLogOut}>
                Log Out
              </button>
            </Link>
          </div>
        </div>
        <Outlet />
      </>
    )
  }

  return (
    <>
      <div className={classes.header}>
        <span>Realworld Blog</span>
        <div>
          <NavLink to="/sign-in">
            <button type="button" className={classes.signIn}>
              Sign In
            </button>
          </NavLink>
          <NavLink to="/sign-up">
            <button type="button" className={classes.signUp}>
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header