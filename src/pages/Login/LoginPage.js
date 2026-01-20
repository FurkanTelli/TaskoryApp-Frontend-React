import React, { useRef, useState } from 'react';
import "./LoginPage.css";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { UserService } from '../../services/UserServices';
import { useDispatch } from 'react-redux';
import { setIslogin, setUserId, setUserToken } from '../../store/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toast } from 'primereact/toast';

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);




  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await UserService.loginUser(userInfo);
      if (response?.status === 200 || response?.status === 201) {
        const twoMinutesFromNow = new Date(Date.now() + 20 * 60 * 1000);
        dispatch(setUserId(response?.data?.loggedInUser?.userId));
        dispatch(setUserToken(response?.data?.token));
        dispatch(setIslogin(true));
        Cookies.set("taskoryToken", response?.data?.token, { expires: twoMinutesFromNow });
        Cookies.set("userId", response?.data?.loggedInUser?.userId, { expires: twoMinutesFromNow });
        setLoading(false);
        await navigate("/")
      }
    } catch (error) {
      if (error?.status === 401) {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'The username or password is incorrect.', life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Backend connection error', life: 3000 });
      }
      setLoading(false);
    }
  };


  const handleUserFields = (val, field) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: val
    }));
  }


  return (
    <div className='flex h-screen'>
      <Toast ref={toast} />
      <div className='m-auto'>
        <Card title="Login">
          <div className="flex flex-column gap-3">
            <IconField iconPosition="left">
              <InputIcon className="pi pi-user"> </InputIcon>
              <InputText placeholder="Email" onChange={(e) => handleUserFields(e.target.value, "email")} />
            </IconField>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-key"> </InputIcon>
              <InputText placeholder="Password" onChange={(e) => handleUserFields(e.target.value, "password")} />
            </IconField>
            <Button label="Submit" loading={loading} onClick={loginUser} />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage;