import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToken = createAsyncThunk('registration/fetchToken', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/users`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      if (res.status === 422) {
        alert('Это имя или email уже занято!')
        return 'error'
      }
      throw new Error(`${res.status}`)
    }

    const result = await res.json()
    alert('Вы успешно зарегистрированны, войдите в аккаунт!')
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchUser = createAsyncThunk('registration/fetchUser', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/users/login`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      if (res.status === 422) {
        alert('Пользователь не найден!')
        return 'error'
      }
      throw new Error(`${res.status}`)
    }

    const result = await res.json()
    alert('Вы успешно вошли в аккаунт!')
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchUpdatedUser = createAsyncThunk('registration/fetchUpdatedUser', async (data, { rejectWithValue }) => {
  try {
    const url = `https://blog.kata.academy/api/user`
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(data.params),
    })

    if (!res.ok) {
      if (res.status === 422) {
        alert('Это имя или email уже занято!')
        return 'error'
      }
      throw new Error(`${res.status}`)
    }

    const result = await res.json()
    alert('Данные пользователя успешно обновлены!')
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const registrationReducer = createSlice({
  name: 'registration',
  initialState: {
    registration: false,
    updatedUser: false,
  },
  reducers: {
    changeRegistration(state, action) {
      state.registration = action.payload
    },
    logOut(state) {
      const result = window.confirm('Вы уверены, что хотите покинуть профиль?')
      if (result) {
        state.registration = false
        localStorage.clear()
      }
      // else {

      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('registration', true)
        state.registration = true
      })

      .addCase(fetchUpdatedUser.fulfilled, (state, action) => {
        if (action.payload !== 'error') {
          localStorage.setItem('user', JSON.stringify(action.payload.user))
          localStorage.setItem('registration', true)
          state.updatedUser = !state.updatedUser
        }
      })
  },
})

export const { changeRegistration, logOut } = registrationReducer.actions

export default registrationReducer.reducer
