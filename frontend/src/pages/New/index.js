import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import './style.css';

import camera from '../../assets/camera.svg';

export default function New({ history }){

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState(0);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },[thumbnail]
    )

    async function handleSubmit(e){
        e.preventDefault();

        const user_id = localStorage.getItem('user');

        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');

    }

    return (
        <form onSubmit={ handleSubmit }>

            <label
            id="thumbnail"
            style={{
                backgroundImage: `url(${preview})`
            }}
            className={ preview ? 'has-thumb' : '' }
            > 
                <input type="file" onChange={ e => setThumbnail(e.target.files[0])} />
                <img src={ camera } alt="Selecionar arquivo" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="Sua empresa"
                type="text"
                value={company}
                onChange={ e => {
                    setCompany(e.target.value)
                }}
            />

            <label htmlFor="techs">Tecnologias *<span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias"
                type="text"
                value={techs}
                onChange={ e => {
                    setTechs(e.target.value)
                }}
            />

            <label htmlFor="price">Preço diária *<span>(em branco pra gratuito)</span></label>
            <input 
                id="price"
                placeholder="Preço diária"
                text="number"
                value={price}
                onChange={ e => {
                    setPrice(e.target.value)
                }}
            />
            <button type="submit" className="btn">
                Enviar
            </button>
        </form>
    )
}