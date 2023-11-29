import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface InterfaceUser {
  _id?: string
  name?: string
  email?: string
  password?: string,
  token?: string
}

const initialState:InterfaceUser = {
  _id: '',
  name: '',
  email: '',
  password: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.email = action.payload.email
      state.password = action.payload.password
      state.token = action.payload.token
    }, logout: (state) => {
      state._id = ''
      state.name = ''
      state.email = ''
      state.password = ''
      state.token = ''
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer