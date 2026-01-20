import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main/MainPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import SettingsPage from '../pages/Settings/SettingsPage';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/Home'></Route>
        <Route path='/Login' element={<LoginPage/>}></Route>
        <Route path='/Register' element={<RegisterPage />}></Route>
        <Route path='/Settings' element={<SettingsPage />}></Route>
    </Routes>
  )
}

export default AppRoutes