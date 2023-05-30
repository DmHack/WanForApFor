import React from 'react'
import style from './Home.module.css';

import git from '../../assets/img/git.png'
import vk from '../../assets/img/vkon.png'


import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react'
import axios from 'axios';

function Home() {

    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [navigate1, setNavigate1] = useState(false);
    const [navigate2, setNavigate2] = useState(false);
    const [navigate3, setNavigate3] = useState(false);
    const [navigate4, setNavigate4] = useState(false);
    const [navigate5, setNavigate5] = useState(false);

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`);
                setEmail(res.data.email)
                setId(res.data.id)
                localStorage.setItem('logImg', res.data.img)
                localStorage.setItem('git', res.data.git)
                localStorage.setItem('vk', res.data.vk)
            }
        )();
    }, [])

    if (navigate) {
        return <Navigate to='/resetPass' />
    }
    if (navigate1) {
        return <Navigate to='/deleteAkk' />
    }
    if (navigate2) {
        return <Navigate to='/newName' />
    }
    if (navigate3) {
        return <Navigate to='/newImg' />
    }
    if (navigate4) {
        return <Navigate to='/newEmail' />
    }
    if (navigate5) {
        return <Navigate to='/newInfos' />
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.infoAkk}>
                    <img className={style.iconInfoMan} src={localStorage.getItem('logImg') || 'https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png'} alt="" />
                    <div className={style.infoMan}>
                        <h1 className={style.nameMan}>{localStorage.getItem('name')}</h1>
                        <p>Почта: {email}</p>
                        <p>Id: {id}</p>
                        <div className={style.gitVkCont}>
                            <img onClick={() => { window.open(localStorage.getItem('git'), '_target') }} className={style.Icgit} src={git} alt="" />
                            <img onClick={() => { window.open(localStorage.getItem('vk'), '_target') }} className={style.Icgit} src={vk} alt="" />
                        </div>
                    </div>
                </div>
                <div className={style.servicesContainer}>
                    <h1 className={style.servsH}>Наши сервисы</h1>
                    <div className={style.services}>
                        <div onClick={() => { window.location.href = `https://service-client.vercel.app/serLog/${id}/${localStorage.getItem('acc')}/${localStorage.getItem('refreshToken')}` }} className={style.service}>
                            <img className={style.logoService} src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/256/external-forum-coaching-and-mentoring-inipagistudio-mixed-inipagistudio.png" alt="" />
                            ApFor
                        </div>
                        <div className={style.service}>
                            <img className={style.logoService} src="https://cdn1.iconfinder.com/data/icons/developer-8/64/14_window_code_development_developer_programmer-256.png" alt="" />
                            В разработке
                        </div>
                        <div className={style.service}>
                            <img className={style.logoService} src="https://cdn1.iconfinder.com/data/icons/developer-8/64/14_window_code_development_developer_programmer-256.png" alt="" />
                            В разработке
                        </div>
                    </div>


                </div>


            </div >
            <div className={style.contdeysts}>
                <div className={style.deyst} onClick={() => setNavigate(true)}>
                    <p>Восстановить пароль</p>
                </div>
                <div className={style.deyst} onClick={() => setNavigate1(true)}>
                    <p>Удалить аккаунт</p>
                </div>
                <div className={style.deyst} onClick={() => setNavigate2(true)}>
                    <p>Изменить имя</p>
                </div>
                <div className={style.deyst} onClick={() => setNavigate3(true)}>
                    <p>Изменить фотографию</p>
                </div>
                <div className={style.deyst} onClick={() => setNavigate4(true)}>
                    <p>Изменить почту</p>
                </div>
                <div className={style.deyst} onClick={() => setNavigate5(true)}>
                    <p>Изменить GIT/VK</p>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>


    )
}

export default Home