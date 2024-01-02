import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (id, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const url = `https://blog.kata.academy/api/articles/${id}`
    let res

    if (!user.token) {
      // eslint-disable-next-line no-shadow
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
      throw new Error(`couldn't get article ${res.status}`)
    }

    const result = await res.json()
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const createArticle = createAsyncThunk('article/createArticle', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(data.params),
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

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles/${data.id}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${data.token}`,
      },
    })

    if (!res.ok) {
      alert('Что-то пошло не так, попробуйте снова!')
      throw new Error(`couldn't create articles ${res.status}`)
    }

    return alert('Вы успешно удалили статью!')
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateArticle = createAsyncThunk('article/updateArticle', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/articles/${data.id}`
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(data.params),
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

const articleReducer = createSlice({
  name: 'article',
  initialState: {
    article: null,
    loading: true,
    error: false,
  },
  reducers: {
    addTags(state, action) {
      state.tags = [...state.tags, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false
        state.article = action.payload.article
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(deleteArticle.fulfilled, (state) => {
        state.error = true
      })

      .addCase(createArticle.fulfilled, () => {
        alert('Вы успешно создали статью!')
      })
      .addCase(createArticle.rejected, (action) => {
        alert(`Ошибка!, ${action.payload}`)
      })

      .addCase(updateArticle.fulfilled, () => {
        alert('Вы успешно отредактировали статью!')
      })
      .addCase(updateArticle.rejected, (action) => {
        alert(`Ошибка!, ${action.payload}`)
      })
  },
})

export const { addTags } = articleReducer.actions

export default articleReducer.reducer
