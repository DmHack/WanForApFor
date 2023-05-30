import React from 'react'
import style from './CreateStat.module.css';

import axios from 'axios'
import { useState, useEffect } from 'react'
import Select from 'react-select';

function CreateStat() {
    const [user, setUser] = useState('');
    const [progURL, setProgURL] = useState('');
    const [text, setTExt] = useState('');
    const [title, setTitle] = useState('');
    const [progAVA, setProgAVA] = useState('');

    const options = [
        { value: 'Программы', label: 'Программы' },
        { value: 'Скрипты', label: 'Скрипты' },
        { value: 'Сайты', label: 'Сайты' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        (
            async () => {
                const me = await axios.get(`users/me`);
                setUser(me.data.id);
            }
        )();
    }, [])


    const submit = async () => {
        const wf = await axios.post('prog/', {
            progUrl: progURL, text, title, prog: progAVA, user, tag: selectedOption.value
        })
        if (wf.status == 200) {
            window.location.href = '/'
        } else {
            alert('ERROR')
        }
    }

    return (
        <div className={style.container}>
            <h1 className={style.hcont}>Создайте запись</h1>
            <div className={style.contINput}>
                <div className={style.contInpts}>
                    <input className={style.inp} type="text" placeholder='Ссылка на сайт/приложение/скрипт' onChange={e => setProgURL(e.target.value)} />
                    <input className={style.inp} type="text" placeholder='Ссылка на титульный фон' onChange={e => setProgAVA(e.target.value)} />
                </div>
                <div className={style.contTExtAr}>
                    {/* <input className={style.inp} type="text" placeholder='TEXT' onChange={e => setTExt(e.target.value)} /> */}
                    {/* <input className={style.inp} type="text" placeholder='TITLE' onChange={e => setTitle(e.target.value)} /> */}
                    <textarea className={style.textArea} cols="30" rows="10" placeholder='Текст записи' onChange={e => setTExt(e.target.value)}></textarea>
                    <textarea className={style.textArea} maxLength='100' cols="30" rows="10" placeholder='Заголовок записи (До 100 символов)' onChange={e => setTitle(e.target.value)}></textarea>
                </div>
                <div className={style.btnSelect}>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        className={style.select}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: 'rgb(31, 35, 38)',
                                border: 'none',
                                boxShadow: '0 0 19px 2px rgba(0, 0, 0, .91)',
                            })
                        }}
                    />
                </div>
                <button className={style.button} onClick={() => { submit() }}>Создать</button>
            </div>
        </div>
    )
}

export default CreateStat