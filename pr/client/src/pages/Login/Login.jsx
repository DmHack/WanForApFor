import React from 'react'
import style from './Login.module.css';

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useState } from 'react';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.warn('Нужно заполнить все поля ввода!', {
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
        if (password.length < 8) {
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
        } else if (validator.isEmail(email)) {
            const wf = await axios.post('users/login', {
                email, password, auth: localStorage.getItem('auth')
            })
                .then((info) => {
                    if (info.message === "Invalid credentials") {
                        toast.error('Неверные учетные данные', {
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
                    else if (info.status === 201) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${info.data.Access_Token}`;
                        window.location.href = `/cod/${info.data.id}`
                    } else if (info.status === 200 && localStorage.getItem('auth')) {
                        localStorage.setItem('name', info.data.name);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${info.data.Access_Token}`;
                        localStorage.setItem('refreshToken', info.data.Refresh_Token);
                        localStorage.setItem('auth', 'true');
                        window.location.href = '/'
                    } else if (info.status === 200 && localStorage.getItem('auth') == undefined) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${info.data.Access_Token}`;
                        window.location.href = `/cod/${info.data.id}`
                    }
                })



        }


    }



    return (
        <main className={style.main}>
            <ToastContainer />
            <form className={style.contForm} onSubmit={submit}>
                <h1 className={style.mainH}>Вход</h1>
                <div className={style.form}>
                    <input className={style.inputEM} type="text" placeholder='email' onChange={e => setEmail(e.target.value)} />
                    <input className={style.inputPS} type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={style.btnLog}>
                    <button className={style.button} type='submit'>Вход</button>
                    <Link className={style.registerLink} to="/register">Регистрация</Link>
                </div>
                <div className={style.restPass}>
                    <p className={style.pVs}>Не помнишь пароль? <Link className={style.vostPs} to="/resetPass">Восстановление пароля</Link></p>
                </div>
            </form>
        </main>
    )
}

export default Login