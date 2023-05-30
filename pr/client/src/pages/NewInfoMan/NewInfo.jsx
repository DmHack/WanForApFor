import React from 'react';
import { useState, useEffect } from 'react';
import style from './NewInfo.module.css';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

function NewInfo() {
    const [git, setGit] = useState('');
    const [vk, setVK] = useState('');

    const submit = () => {
        axios.post('users/setGitVk', { git, vk }).then((info) => {
            if (info.status === 201 || info.status === 200) {
                window.location.href = '/'
            }

        });


    }

    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <h1 className={style.rsH}>Введите ссылки на GITHUB или Vk</h1>
                    <div className={style.contInp}>
                        <input type="text" placeholder='Ссылка на GIT' className={style.inpEm} onChange={e => setGit(e.target.value)} />
                        <input type="text" placeholder='Ссылка на VK' className={style.inpEm} onChange={e => setVK(e.target.value)} />
                    </div>
                    <div>
                        <button className={style.button} onClick={submit}>Отправить</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewInfo;