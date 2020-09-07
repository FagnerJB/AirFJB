import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){

    const [ email, setEmail ] = useState('');

    async function handleSubmit(e){
      e.preventDefault();
      
      const response = await api.post('/sessions', { email } );
  
      const { id } = response.data[0];
  
      localStorage.setItem( 'user', id );

      history.push('/dashboard');
  
    }

    return(
        <>
            <p>
                Ofereça spots para programadores.
            </p>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="email">E-mail*</label>
                <input
                    id="email"
                    type="email"
                    placeholder="nome@dominio.com"
                    value={ email }
                    onChange={ e => setEmail(e.target.value) }
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}
