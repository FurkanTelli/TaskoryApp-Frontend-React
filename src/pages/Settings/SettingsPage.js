import React, { useEffect, useRef, useState } from 'react'
import "./SettingsPage.css";
import { Panel } from 'primereact/panel';
import { useDispatch, useSelector } from 'react-redux';
import { UserService } from '../../services/UserServices';
import Cookies from 'js-cookie';
import { setIslogin, setShowSideBar, setUserId, setUserName, setUserTasks, setUserToken } from '../../store/userSlice';
import { Toast } from 'primereact/toast';
import { data, useNavigate } from 'react-router-dom';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';



const SettingsPage = () => {
    const [editUser, setEditUser] = useState({ userName: "", userEmail: "", password: "", rePassword: "" });
    const [deleteUser, setDeleteUser] = useState({ emailForDelete: "", passwordForDelete: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfos = useSelector(state => state?.userStore);
    const dispatch = useDispatch();
    const toast = useRef();
    const navigate = useNavigate();



    const getUser = async () => {
        try {
            let myId = Cookies.get("userId");
            if (myId === undefined) {
                return navigate("/")
            }
            const response = await UserService.getUserById(myId);
            if (response?.status === 200 || response?.status === 201) {
                setEditUser({ userName: response?.data?.userName, userEmail: response?.data?.userEmail, password: response?.data?.userPassword })
                dispatch(setUserId(response?.data?.userId));
                dispatch(setIslogin(true));
                dispatch(setUserName(response?.data?.userName))
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        let isAllFieldFilled = Object.values(editUser).every(val => val && val.trim() !== "" && val.length > 4)
        let isPasswordMatch = editUser.password === editUser.rePassword;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let isEmailValid = emailRegex.test(editUser.userEmail);
        setIsFormValid(isAllFieldFilled && isPasswordMatch && isEmailValid);
    }, [editUser]);


    const handleUserFields = (val, type) => {
        setEditUser((prev) => ({
            ...prev,
            [type]: val
        }));
    }

    const deleteUserFields = (val, type) => {
        setDeleteUser((prev) => ({
            ...prev,
            [type]: val
        }));
    }

    const headerOfTheEditPanel = () => {
        return (
            <div className='p-panel-header-class'>
                <h2>{userInfos.userName}</h2>
                {isEdit ?
                    <Button label="Cancel" icon="pi pi-arrow-left" severity="danger" onClick={() => {
                        setIsEdit(false)
                        setEditUser({ userName: "", userEmail: "", password: "", rePassword: "" })
                    }} />
                    : <Button label="Edit" icon="pi pi-pencil" severity="help" onClick={() => {
                        setIsEdit(true)
                        setEditUser({ userName: "", userEmail: "", password: "", rePassword: "" })
                    }} />}
            </div>
        )
    }

    const submitEditTransaction = async () => {
        try {
            setLoading(true);
            const userId = Cookies.get("userId")
            const dataToSend = { userName: editUser.userName, userEmail: editUser.userEmail, password: editUser.password };
            const response = await UserService.updateUser(userId, dataToSend)
            console.log(response);
            if (response?.status === 200 || response?.status === 201) {
                setLoading(false);
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'User is updated succesfully', life: 3000 });
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    const acceptDeleteTransaction = async () => {
        try {
            setLoading(true);
            const userId = Cookies.get("userId");
            const response = await UserService.deleteUser(userId, deleteUser);
            if (response?.status === 204) {
                dispatch(setUserId(""))
                dispatch(setUserName(""))
                dispatch(setIslogin(false))
                dispatch(setUserTasks(""))
                dispatch(setShowSideBar(false))
                toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                Cookies.remove("taskoryToken");
                Cookies.remove("userId");
                navigate("/")
                setLoading(false)
                setVisible(false)
            }
        } catch (error) {
            console.log(error)
            toast.current.show({ severity: 'error', summary: 'Email or password do not match', detail: error?.response?.data, life: 3000 });
            setLoading(false);
        }
    }

    const rejectUserDeleteTransaction = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        setVisible(false)
        setDeleteUser({ emailForDelete: "", passwordForDelete: "" })
    }


    const footerContent = (
        <div>
            <Button label="No" severity='danger' icon="pi pi-times" onClick={rejectUserDeleteTransaction} className="p-button-text" />
            <Button label="Yes" raised severity='danger' disabled={deleteUser.emailForDelete.trim() === "" || deleteUser.passwordForDelete.trim() === ""} icon="pi pi-check" onClick={acceptDeleteTransaction} autoFocus />
        </div>
    );

    return (
        <div className="card mt-2">
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
                <div>
                    <div className='flex align-items-center justify-content-between'>
                        <p>Email:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"> </InputIcon>
                            <InputText value={deleteUser.emailForDelete} placeholder="Enter the email for delete..." onChange={(e) => deleteUserFields(e.target.value, "emailForDelete")} />
                        </IconField>
                    </div>
                    <div className='flex align-items-center justify-content-between'>
                        <p>Password:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-lock"> </InputIcon>
                            <InputText value={deleteUser.passwordForDelete} placeholder="Enter the password for delete..." onChange={(e) => deleteUserFields(e.target.value, "passwordForDelete")} />
                        </IconField>
                    </div>
                </div>
            </Dialog>
            <Panel header={headerOfTheEditPanel}>
                <div className="flex flex-column gap-3">
                    <div className='flex align-items-center justify-content-between'>
                        <p>Username:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"> </InputIcon>
                            <InputText value={editUser.userName} placeholder={editUser.userName === "" ? "User Name..." : editUser.userName} disabled={!isEdit} onChange={(e) => handleUserFields(e.target.value, "userName")} />
                        </IconField>
                    </div>
                    <div className='flex align-items-center justify-content-between'>
                        <p>Email:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"> </InputIcon>
                            <InputText value={editUser.userEmail} placeholder={editUser.userEmail === "" ? "Email..." : editUser.userEmail} disabled={!isEdit} onChange={(e) => handleUserFields(e.target.value, "userEmail")} />
                        </IconField>
                    </div>
                    <div className='flex align-items-center justify-content-between'>
                        <p>Password:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-lock"> </InputIcon>
                            <InputText value={editUser.password} placeholder={editUser.password === "" ? "Password..." : editUser.password} disabled={!isEdit} onChange={(e) => handleUserFields(e.target.value, "password")} />
                        </IconField>
                    </div>

                    {isEdit && <div className='flex align-items-center justify-content-between'>
                        <p>Repeat Password:</p>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-key"> </InputIcon>
                            <InputText value={editUser.rePassword} placeholder="Repeat Password..." onChange={(e) => handleUserFields(e.target.value, "rePassword")} />
                        </IconField>
                    </div>
                    }

                    <Button label="Submit" severity='success' disabled={!isEdit || !isFormValid} loading={loading} onClick={submitEditTransaction} />
                    <Button label="Delete" severity='danger' disabled={!isEdit || Cookies.get("userId") === "11111111-1111-1111-1111-111111111111"} loading={loading} onClick={() => setVisible(true)} />
                </div>
            </Panel>
        </div>
    )
}

export default SettingsPage;