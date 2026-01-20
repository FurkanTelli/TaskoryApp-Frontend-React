import React, { useContext, useEffect, useState } from 'react'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { PrimeReactContext } from 'primereact/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIslogin, setShowSideBar, setTheme, setUserId, setUserToken } from '../../store/userSlice';
import "./ToolbarComponent.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dialog } from 'primereact/dialog';

const ToolbarComponent = () => {

    const { changeTheme } = useContext(PrimeReactContext);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const myTheme = useSelector(state => state?.userStore?.darkTheme);
    const isUserLoggedIn = useSelector(state => state?.userStore?.isLogin);
    const sidebar = useSelector(state => state?.userStore?.showSideBar);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const toggleTheme = () => {
        const current = myTheme ? "viva-dark" : "viva-light";
        const next = myTheme ? "viva-light" : "viva-dark";

        changeTheme(current, next, "theme-link", () => {
            dispatch(setTheme())
        });
    };

    const ShowSideBar = () => {
        dispatch(setShowSideBar());
        // console.log(sidebar)
    }

    // useEffect(() => {
    //     if (isUserLoggedIn || Cookies.get("userId")) {
    //         if (location?.pathname === "/Login" || location?.pathname === "/Register") {
    //             navigate("/")
    //         }
    //     }
    //     if (Cookies.get("userId") === undefined && Cookies.get("taskoryToken") === undefined) {
    //         dispatch(setUserId(""));
    //         dispatch(setUserToken(""));
    //         dispatch(setIslogin(false));
    //         navigate("/")
    //     }
    //     // if(isUserLoggedIn && location?.pathname === "/Login") {
    //     // } 
    // }, [location,isUserLoggedIn, dispatch, navigate])

    useEffect(() => {
        const userId = Cookies.get("userId");
        const token = Cookies.get("taskoryToken");

        // 1. Durum: Kullanıcı giriş yapmışsa Login/Register sayfasına girmesin
        if (userId) {
            if (location?.pathname === "/Login" || location?.pathname === "/Register") {
                navigate("/");
            }
        }
        if (userId === undefined || token === undefined) {
            dispatch(setUserId(""));
            dispatch(setUserToken(""));
            dispatch(setIslogin(false));

        }
    }, [location, dispatch, navigate]);


    const logoutTransaction = () => {
        dispatch(setUserId(""));
        dispatch(setUserToken(""));
        dispatch(setIslogin(false));
        Cookies.remove("userId");
        Cookies.remove("taskoryToken");
        setShowLogoutDialog(false);
        navigate("/")
    }

    const logoutFooterContent = (
        <div>
            <Button label="No" severity='danger' icon="pi pi-times" onClick={() => setShowLogoutDialog(false)} className="p-button-text" />
            <Button label="Yes" severity='danger' icon="pi pi-check" onClick={logoutTransaction} autoFocus />
        </div>
    );

    const startContent = (
        <div className='flex align-items-center' >
            <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i>
            {(isUserLoggedIn || Cookies.get("userId")) && <i className="pi pi-arrow-right ml-2 opacity-50 cursor-pointer" onClick={ShowSideBar} style={{ fontSize: '1rem' }}></i>}
        </div>
    );

    const endContent = (
        <div className='flex align-items-center'>
            {(location?.pathname !== "/Register" && !isUserLoggedIn && !Cookies.get("userId")) ? <Button label="Register" className='mr-1' severity="success" onClick={() => navigate("/Register")} outlined /> : ""}
            {(location?.pathname !== "/Login" && !isUserLoggedIn && !Cookies.get("userId")) ? <Button label='Login' className='mx-1' onClick={() => navigate("/Login")} /> : ""}
            <Button icon={myTheme ? 'pi pi-sun' : 'pi pi-moon'} severity={myTheme ? "warning" : "contrast"} onClick={toggleTheme} className="mr-2" />
            {isUserLoggedIn || Cookies.get("userId") ? <Button label="Logout" severity='danger' icon="pi pi-sign-out" iconPos="right" onClick={() => setShowLogoutDialog(true)} /> : ""}
        </div>
    );


    return (
        <div className="card">
            <Dialog header="Header" visible={showLogoutDialog} style={{ width: '50vw' }} onHide={() => { if (!showLogoutDialog) return; setShowLogoutDialog(false); }} footer={logoutFooterContent}>
                <p className="m-0">
                    Are you sure you want to logout ?
                </p>
            </Dialog>
            <Toolbar start={startContent} end={endContent} />
        </div>
    )
}

export default ToolbarComponent;