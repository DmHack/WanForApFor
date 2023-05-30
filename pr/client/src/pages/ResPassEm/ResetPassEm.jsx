import React from 'react'
import style from './ResetPassEm.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ResetPassEm() {
    const [password, setPassword] = useState('');
    const [passwordPovt, setPasswordPovt] = useState('');
    const { id, random } = useParams();


    const submit = () => {
        if (password === passwordPovt && password !== '' && passwordPovt !== '' && password.length >= 8 && passwordPovt.length >= 8) {
            axios.post('users/sendRestPassEm', { id: id, token: random, password: password }).then((info) => {
                if (info.status === 200 || info.status === 201) {
                    setTimeout(
                        toast.success('Пароль успешно изменён', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        }), 100)
                    setTimeout(window.location.href = '/login', 5000)
                } else {
                    toast.error(info.message, {
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
        } else if (password === '' || passwordPovt === '') {
            toast.warn('Заполните поля ввода!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (password.length < 8 || passwordPovt.length < 8) {
            toast.warn('Пароль должен быть больше 8 символов!', {
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
            toast.warn('Пароли не совпадают!', {
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

    }


    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <div>
                        <h1 className={style.rsH}>Восстановление пароля</h1>
                        <div className={style.divInp}>
                            <input type="password" placeholder='Новый пароль' className={style.inpEm} onChange={e => setPassword(e.target.value)} />
                            <input type="password" placeholder='Повтор пароля' className={style.inpEm} onChange={e => setPasswordPovt(e.target.value)} />
                        </div>
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

export default ResetPassEm