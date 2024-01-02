import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Favorites.module.scss'
import { addFavoritesCount, reduceFavoritesCount } from '../../store/articlesReducer'

function Favorites({ link, text, favoritesCount, slug, favorited }) {
  const dispatch = useDispatch()
  const [isClicked, setIsClicked] = useState(false)
  const [heartClass, setHeartClass] = useState('')
  const [countfavorites, setCountfavorites] = useState(favoritesCount)
  const registration = localStorage.getItem('registration')

  useEffect(() => {
    setCountfavorites(favoritesCount)
    setHeartClass(favorited ? `${classes.heart} ${classes.clicked}` : classes.heart)
  }, [favorited, favoritesCount])

  const handleButtonClick = () => {
    if (registration) {
      setIsClicked(!isClicked)
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user
      if (isClicked) {
        dispatch(
          addFavoritesCount({
            id: slug,
            token,
          })
        )
      } else {
        dispatch(
          reduceFavoritesCount({
            id: slug,
            token,
          })
        )
      }
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
