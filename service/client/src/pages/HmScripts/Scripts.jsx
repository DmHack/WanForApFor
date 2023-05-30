import React from 'react'
import style from './Scripts.module.css'

import { Navigate } from "react-router-dom";

import { useEffect, useState } from 'react'
import axios from 'axios';


/*  ICONS  */
import prog from '../../assets/icon/app.png'
import scr from '../../assets/icon/scr.png'
import sait from '../../assets/icon/sait.png'
import tg from '../../assets/icon/teleg.png'
import vk from '../../assets/icon/vkon.png'

function Scripts() {
    const [progStat, setProgStat] = useState([]);
    const [navigate, setNavigate] = useState(false);
    const [navigate1, setNavigate1] = useState(false);
    const [navigate2, setNavigate2] = useState(false);

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`prog/`);
                const me = await axios.get(`users/me`);
                localStorage.setItem('logImg', me.data.img);
                setProgStat(res.data.progs);
                console.log(res);
            }
        )();
    }, [])


    let res = progStat.map(function (item, index) {
        if (item.tag == 'Скрипты') {
            return <div key={index} className={style.contStat}>
                <div className={style.userPg} >
                    <div className={style.authorInfo}>
                        <div className={style.authInD}>
                            <img className={style.Avatar} src={item.avatar} alt="" />
                            <p className={style.nameSt}>{item.userName}</p>
                            <p className={style.tag}>{item.tag}</p>
                        </div>
                        <div>
                            <p className={style.dataD}>{(item.createdAt).split('T')[0]}</p>
                        </div>
                    </div>
                </div>
                <div className={style.infoPr}>
                    <div className={style.divPInfo}>
                        <p className={style.pINfp}>{item.title}</p>
                    </div>
                    <div className={style.contTitle} style={{
                        backgroundImage: `url("${item.prog}")`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    <div className={style.btnPr}>
                        <button className={style.button} onClick={() => { window.location.href = `pr/${item._id}` }}>Прочитать</button>
                        <button className={style.button} onClick={() => { window.open(`user/${item.user}`) }}>Перейти к автору</button>
                    </div>
                </div>

            </div>
        }

    });

    if (navigate) {
        return <Navigate to='/progs' />
    }
    if (navigate1) {
        return <Navigate to='/scripts' />
    }
    if (navigate2) {
        return <Navigate to='/saits' />
    }

    return (
        <div className={style.container}>
            <div className={style.contCateg}>
                <div className={style.kateg}>
                    <div className={style.btDiv} onClick={() => { setNavigate(true) }}><span className={style.spanIc}><img className={style.icPr} src={prog} alt="" /></span>Программы</div>
                    <div className={style.btDiv} onClick={() => { setNavigate1(true) }}><span className={style.spanIc}><img className={style.icPr} src={scr} alt="" /></span>Скрипты</div>
                    <div className={style.btDiv} onClick={() => { setNavigate2(true) }}><span className={style.spanIc}><img className={style.icPr} src={sait} alt="" /></span>Сайты</div>
                </div>

                <div className={style.linksAut}>
                    <img onClick={() => { window.open('https://t.me/wandering_force', '_target') }} className={style.imgLinks} src={tg} alt="" />
                    <img onClick={() => { window.open('https://vk.com/wandering_force', '_target') }} className={style.imgLinks} src={vk} alt="" />
                </div>
            </div>

            <div className={style.contStats}>
                <div className={style.stat}>
                    {res}
                </div>
            </div>

        </div>
    )
}

export default Scripts