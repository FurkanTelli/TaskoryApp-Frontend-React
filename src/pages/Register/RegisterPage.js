import React, { useRef, useState } from 'react';
import "./RegisterPage.css";
import { Card } from 'primereact/card';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserServices';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const RegisterPage = () => {
    const [userInfo, setUserInfo] = useState({ email: "", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);

    const handleUserFields = (val, field) => {
        setUserInfo((prev) => ({
            ...prev,
            [field]: val
        }));
    };

    const registerTransaction = async () => {
        setLoading(true);
        try {
            const response = await UserService.registerUser(userInfo);
            if (response?.status === 200 || response?.status === 201) {
                await navigate("/Login")
                setLoading(false);
            }
        } catch (error) {
            if (error?.status === 400) {
                console.log(error)
                toast.current.show({ severity: 'warn', summary: 'Warning', detail: error?.response?.data, life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Backend connection error', life: 3000 });
            }
            setLoading(false)
        }
    }


    return (
        <div className='flex h-screen'>
            <Toast ref={toast} />
            <div className='m-auto'>
                <Card title="Login">
                    <div className="flex flex-column gap-3">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-key"> </InputIcon>
                            <InputText placeholder="Username" onChange={(e) => handleUserFields(e.target.value, "username")} />
                        </IconField>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"> </InputIcon>
                            <InputText placeholder="Email" onChange={(e) => handleUserFields(e.target.value, "email")} />
                        </IconField>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-key"> </InputIcon>
                            <InputText placeholder="Password" onChange={(e) => handleUserFields(e.target.value, "password")} />
                        </IconField>
                        <Button label="Submit" loading={loading} onClick={registerTransaction} />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default RegisterPage;