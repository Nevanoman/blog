import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articlesReducer'
import articleReducer from './articleReducer'
import registrationReducer from './registrationReducer'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    registration: registrationReducer,
  },
})