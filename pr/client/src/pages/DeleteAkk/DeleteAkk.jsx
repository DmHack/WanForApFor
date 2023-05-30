import React from 'react'
import style from './DeleteAkk.module.css'

import { useEffect, useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DeleteAkk() {
    const [email, setEmailAx] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`).then((info) => {

                    setEmailAx(info.data.email);
                    setId(info.data.id);
                });
            }
        )();
    }, [])

    const submit = () => {
        axios.post('users/deleteAkk', { 'id': id, 'email': email, 'password': password }).then((info) => {
            if (info.status == 200 || info.status == 201) {
                toast.success('Письмо отправлено на почту', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (info.message === 'Invalid credentials') {
                toast.error('Неверные учётные данные', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error('Не удалось отправить письмо', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        })
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <div>
                        <h1 className={style.rsH}>Удаление аккаунта</h1>
                        <input type="password" placeholder='Пароль' className={style.inpEm} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className={style.button} onClick={submit}>Отправить</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default DeleteAkk