import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import style from './NewNameEm.module.css';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewNameEm() {
    const [name, setName] = useState('');
    const { id, random } = useParams();


    const submit = () => {
        if (name !== '' && id !== '' && random != '') {
            axios.post('users/newNameEm', { 'id': id, 'token': random, 'name': name, }).then((info) => {
                if (info.status === 201) {
                    localStorage.setItem('name', info.data.name);
                    window.location.href = '/'
                } else if (info.message == 'Срок смены имени истёк') {
                    toast.error('Срок смены имени истёк', {
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
        } else if (name === '') {
            toast.error('Заполните поле!', {
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

    }

    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <div>
                        <h1 className={style.rsH}>Введите ваше новое имя (никнейм)</h1>
                        <input type="text" placeholder='Новое имя (никнейм)' maxLength="20" className={style.inpEm} onChange={e => setName(e.target.value)} />
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

export default NewNameEm