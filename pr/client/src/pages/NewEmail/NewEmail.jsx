import React from 'react';
import { useState, useEffect } from 'react';
import style from './NewEmail.module.css';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewEmail() {
    const [email, setEmail] = useState('');
    const [emailAx, setEmailAx] = useState('');
    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`);
                setEmailAx(res.data.email)
            }
        )();
    }, [])


    const submit = () => {
        if (emailAx == email) {
            axios.post('users/newEmail', { email: email }).then((info) => {
                if (info.status === 201 || info.status === 200) {
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
                } else {
                    toast.error('Письмо отправлено на почту', {
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
        } else {
            toast.warn('Введите свою почту!', {
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
                        <h1 className={style.rsH}>Введите действующую почту</h1>
                        <input type="email" placeholder='Почта' className={style.inpEm} onChange={e => setEmail(e.target.value)} />
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

export default NewEmail;