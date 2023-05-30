import React from 'react'
import style from './Register.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordPovt, setPasswordPovt] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (password === passwordPovt && password.length >= 8 && passwordPovt.length >= 8 && name !== '' && email !== '') {
            await axios.post('users/register', {
                name, email, password, img
            });
            setNavigate(true);
        } else if (password !== passwordPovt) {
            toast.error('Пароли не совпадают!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (password === '' || passwordPovt === '') {
            toast.error('Введите пароль!', {
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
            toast.error('Пароль должен быть больше 8 символов!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (name === '' || email === '') {
            toast.error('Заполните все поля!', {
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

    if (navigate) {
        return <Navigate to='/login' />
    }


    return (
        <main className={style.main}>
            <form className={style.contForm} onSubmit={submit}>
                <h1 className={style.mainH}>Регистрация</h1>
                <div className={style.form}>
                    <div className={style.contsForm}>
                        <input className={style.inputPS} type="text" placeholder='Имя (никнейм)' maxlength="20" onChange={e => setName(e.target.value)} />
                        <input className={style.inputPS} type="email" placeholder='Почта' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={style.contsForm}>
                        <input className={style.inputPS} type="password" placeholder='Пароль' onChange={e => setPassword(e.target.value)} />
                        <input className={style.inputPS} type="password" placeholder='Повтор пароля' onChange={e => setPasswordPovt(e.target.value)} />
                    </div>
                    <div className={style.contsForm}>
                        <input className={style.inputPS} type="text" placeholder='Фотография профиля' onChange={e => setImg(e.target.value)} />
                    </div>

                </div>
                <div className={style.btnLog}>
                    <button className={style.button} type='submit'>Регистрация</button>
                </div>
                <div className={style.restPass}>
                    <p className={style.pVs}>Уже есть учетная запись? <Link className={style.vostPs} to="/login">Войти</Link></p>
                </div>
            </form>
            <ToastContainer />
        </main>
    )
}

export default Register