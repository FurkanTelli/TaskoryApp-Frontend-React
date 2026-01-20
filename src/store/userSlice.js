import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userToken:"",
    userId:"",
    userName:"",
    userTasks:[],
    showSideBar:false,
    darkTheme:false,
    isLogin:false
}


export const userSlice = createSlice({
    name:"myUser",
    initialState,
    reducers:{
        setUserId:(state,action) => {
            state.userId = action.payload;
        },
        setUserName:(state,action) => {
            state.userName = action.payload;
        },
        setUserToken:(state,action) => {
            state.userToken = action.payload;
        },
        setIslogin:(state,action) => {
            state.isLogin = action.payload;
        },
        setUserTasks:(state,action) => {
            state.userTasks = action.payload;
        },
        setShowSideBar:(state) => {
            state.showSideBar = !state.showSideBar;
        },
        setTheme:(state) => {
            state.darkTheme = !state.darkTheme;
        }
    }
})

export const {setUserId, setUserName, setUserToken, setUserTasks, setShowSideBar, setTheme, setIslogin} = userSlice.actions;
export default userSlice.reducer;