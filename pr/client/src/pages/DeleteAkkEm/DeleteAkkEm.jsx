import React from 'react'
import axios from 'axios';
import style from './DeleteAkkEm.module.css'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteAkkEm() {
    const [me, setMe] = useState('');
    const { id, random } = useParams();
    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`);

                setMe(res.data.email)


                toast.info('Восстановить аккаут невозможно!', {
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
        )();
    }, [])


    const submit = () => {
        axios.post('users/deleteAkkEm', { 'id': id, 'rand': random, 'email': me, }).then((info) => {
            if (info.status === 201) {
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('acc');
                localStorage.removeItem('auth');
                localStorage.removeItem('logImg');
                localStorage.removeItem('name');
                window.location.href = '/login'
            } else {
                toast.error('Не удалось удалить аккаунт', {
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
        });
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <div>
                        <h1 className={style.rsH}>Вы уверены, что хотите удалить аккаунт?</h1>
                    </div>
                    <div>
                        <button className={style.button} onClick={submit}>Удалить</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default DeleteAkkEm