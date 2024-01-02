import { format } from 'date-fns'
import classes from './Item-article.module.scss'
import Favorites from '../Favorites'

function ItemArticles({ title, tagList, body, username, image, data, slug, favoritesCount, favorited }) {
  function trimText(text, titl) {
    if (titl) {
      if (text.split('').length > 50) {
        const newTrimText = `${text.slice(0, 50).split(' ').slice(0).join(' ')}...`
        return newTrimText
      }
    }
    if (text.split('').length > 250) {
      const newTrimText = `${text.slice(0, 250).split(' ').slice(0, -3).join(' ')}...`
      return newTrimText
    }
    return text
  }

  function getTags(arr) {
    if (!arr) {
      return null
    }
    return (
      <>
        {arr.map((tag) => (
          <span className={classes.tag} key={Math.random().toString(36).substring(2)}>
            {trimText(tag, tag)}
          </span>
        ))}
      </>
    )
  }

  const link = `/articles/${slug}`

  return (
    <div className={classes.content}>
      <Favorites
        link={link}
        text={trimText(title, title)}
        favoritesCount={favoritesCount}
        slug={slug}
        favorited={favorited}
      />
      <div>{getTags(tagList)}</div>
      <div className={classes.body}>{trimText(body)}</div>
      <div className={classes.user}>
        <div>
          <div className={classes.username}>{username}</div>
          <div className={classes.data}>{format(data, 'MMMM dd, yyyy')}</div>
        </div>
        <img className={classes.img} src={image} alt="user img" />
      </div>
    </div>
  )
}

export default ItemArticles
