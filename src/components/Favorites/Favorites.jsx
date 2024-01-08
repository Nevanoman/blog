import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Favorites.module.scss'
import { addFavoritesCount, reduceFavoritesCount } from '../../store/articlesReducer'

function Favorites({ link, text, favoritesCount, slug, favorited }) {
  const dispatch = useDispatch()
  const [isClicked, setIsClicked] = useState(favorited)
  const [heartClass, setHeartClass] = useState(favorited ? `${classes.heart} ${classes.clicked}` : classes.heart)
  const [countfavorites, setCountfavorites] = useState(favoritesCount)
  const registration = localStorage.getItem('registration')

  const handleButtonClick = () => {
    if (registration) {
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user

      if (!isClicked) {
        dispatch(
          addFavoritesCount({
            id: slug,
            token,
          })
        )
        setCountfavorites((prevCount) => prevCount + 1)
      } else {
        dispatch(
          reduceFavoritesCount({
            id: slug,
            token,
          })
        )
        setCountfavorites((prevCount) => prevCount - 1)
      }

      setIsClicked((prevIsClicked) => !prevIsClicked)
      setHeartClass((prevHeartClass) =>
        prevHeartClass.includes(classes.clicked) ? classes.heart : `${classes.heart} ${classes.clicked}`
      )
    }
  }

  return (
    <>
      <Link to={link} className={classes.link}>
        <h4 className={classes.h4}>{text}</h4>
      </Link>
      <button type="button" className={heartClass} onClick={handleButtonClick}>
        {}
      </button>
      <span className={classes.spanHeart}>{countfavorites}</span>
    </>
  )
}

export default Favorites
