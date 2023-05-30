import React from 'react'
import { useState, useEffect } from 'react';
import style from './NewImg.module.css';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewImg() {
    const [img, setImg] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`);
                setId(res.data.id)
            }
        )();
    }, [])

    const submit = () => {
        axios.post('users/newPhMan', { 'newPh': img, id }).then((info) => {
            if (info.status == 201) {
                window.location.href = '/'
            } else {
                toast.error('Не удалось изменить фотографию профиля', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <div>
                        <h1 className={style.rsH}>Введите ссылку на фотографию</h1>
                        <input type="text" placeholder='Ссылка на фотографию' className={style.inpEm} onChange={e => setImg(e.target.value)} />
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

export default NewImg;