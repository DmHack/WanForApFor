import React from 'react';
import { useState } from 'react';

import axios from 'axios';
import style from './NewName.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewName() {
    const [email, setEmail] = useState('');

    const submit = () => {
        axios.post('users/newName', { 'email': email }).then((info) => {
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
                        <h1 className={style.rsH}>Изменение имени</h1>
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

export default NewName;