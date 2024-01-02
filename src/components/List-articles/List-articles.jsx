import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'
import classes from './List-articles.module.scss'
import { fetchArticles } from '../../store/articlesReducer'

import ItemArticles from '../Item-article'
import Footer from '../Footer'

function ListArticles() {
  const articles = useSelector((state) => state.articles.articles)
  const loading = useSelector((state) => state.articles.loading)
  const error = useSelector((state) => state.articles.error)
  const page = useSelector((state) => state.articles.page)
  const favorites = useSelector((state) => state.articles.favorites)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ page: (page - 1) * 5 }))
  }, [dispatch, page, favorites])

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

  if (articles.length === 0) {
    return <div className={classes.error}>Статей больше нет!</div>
  }

  return (
    <div className={classes.content}>
      {articles.map((article) => (
        <ItemArticles
          key={articles.slug}
          slug={article.slug}
          title={article.title}
          tagList={article.tagList || []}
          body={article.body}
          username={article.author.username}
          data={article.createdAt}
          image={article.author.image}
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
        />
      ))}

      <Footer />
    </div>
  )
}

export default ListArticles