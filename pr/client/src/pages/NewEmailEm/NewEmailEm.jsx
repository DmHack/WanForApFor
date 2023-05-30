import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import style from './NewEmailEm.module.css';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewEmailEm() {
    const [email, setEmail] = useState('');
    const { id, random } = useParams();


    const submit = () => {
        if (email !== '') {
            axios.post('users/newEmailEm', { id: id, token: random, email: email }).then((info) => {
                if (info.status == 201 || info.status == 200) {
                    window.location.href = '/'
                } else if (info.message === 'Срок смены почты истёк') {
                    toast.error('Срок смены почты истёк', {
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
                else {
                    toast.error('Ошибка', {
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
        } else {
            toast.warn('Заполните поле!', {
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
                        <h1 className={style.rsH}>Введите вашу новую почту</h1>
                        <input type="email" placeholder='Новая почта' className={style.inpEm} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <button className={style.button} onClick={submit}>Изменить</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}

export default NewEmailEm