import React from 'react'
import style from './Prog.module.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Prog() {
    const { id } = useParams();
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [progAva, setProgAva] = useState('');
    const [ava, setAva] = useState('');
    const [progUrl, setProgUrl] = useState('');


    useEffect(() => {
        (
            async () => {
                const res = await axios.post(`prog/pr`, { id: id });
                const me = await axios.get(`users/me`);
                setText(res.data.goals.text)
                setTitle(res.data.goals.title)
                setName(res.data.goals.userName)
                setProgAva(res.data.goals.prog)
                setAva(res.data.goals.avatar)
                setProgUrl(res.data.goals.progUrl)
            }
        )();
    }, [])


    return (
        <div className={style.container}>
            <div>
                <div className={style.infoAkk}>
                    <div className={style.infoMan}>
                        <img className={style.avaMan} src={ava} alt="" />
                        <p className={style.nameSt}>{name}</p>
                    </div>
                </div>
                <div className={style.btnCont}>
                    <button className={style.button} onClick={() => { window.location.href = '/' }}>Главная</button>
                    <button className={style.button} onClick={() => { window.open(progUrl, '_blank') }}>Перейти</button>
                </div>
            </div>
            <div className={style.contMain}>
                <div className={style.main}>
                    <h1 className={style.Hmain}>{title}</h1>
                    <div className={style.fon} style={{
                        backgroundImage: `url("${progAva}")`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                    <p className={style.PMain}>{text}</p>
                </div>
            </div>

        </div>
    )


}

export default Prog