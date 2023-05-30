import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Cod.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cod() {
    const [cod, setCod] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            toast.info('Код отправлен на вашу почту', {
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
    }, [])

    const submit = () => {
        axios.post('users/cod', { id: id, cod: cod }).then((info) => {
            if (info.status === 201) {
                localStorage.setItem('name', info.data.name);
                axios.defaults.headers.common['Authorization'] = `Bearer ${info.data.Access_Token}`;
                localStorage.setItem('refreshToken', info.data.Refresh_Token);
                localStorage.setItem('auth', 'true');
                window.location.href = '/'
            }
        });
    }


    return (
        <div className={style.container}>
            <ToastContainer />
            <div className={style.cod}>
                <div>
                    <h1 className={style.mainH}>Введите код</h1>
                    <input className={style.inputPS} type="text" placeholder='Код' onChange={e => setCod(e.target.value)} />
                </div>
                <div>
                    <button className={style.button} onClick={submit}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

export default Cod