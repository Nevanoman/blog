import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('article/fetchArticles', async (obj, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const url = `https://blog.kata.academy/api/articles?limit=5&offset=${obj.page}`

    let res

    if (!user.token) {
      res = await fetch(url)
    } else {
      res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
    }

    if (!res.ok) {
      throw new Error(`failed to get list of articles ${res.status}`)
    }

    const result = await res.json()
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const addFavoritesCount = createAsyncThunk('articles/addFavoritesCount', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles/${data.id}/favorite`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${data.token}`,
      },
    })

    if (!res.ok) {
      throw new Error(`couldn't create articles ${res.status}`)
    }

    const result = await res.json()
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const reduceFavoritesCount = createAsyncThunk(
  'articles/reduceFavoritesCount',
  async (data, { rejectWithValue }) => {
    try {
      const url = `https://blog.kata.academy/api/articles/${data.id}/favorite`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${data.token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`couldn't create articles ${res.status}`)
      }

      const result = await res.json()
      return result
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const articlesReducer = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: true,
    error: false,
    page: 1,
    favorites: false,
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.loading = false
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.error = true
      })

      .addCase(addFavoritesCount.fulfilled, (state) => {
        state.favorites = !state.favorites
      })

      .addCase(reduceFavoritesCount.fulfilled, (state) => {
        state.favorites = !state.favorites
      })
  },
})

export const { changePage } = articlesReducer.actions

export default articlesReducer.reducer
