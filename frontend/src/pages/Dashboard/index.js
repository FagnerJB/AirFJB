import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './style.css';


export default function Dashboard(){

    const [ spots, setSpots ] = useState([]);
    const [ requests,  setRequests ] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://192.168.2.10:3333', {
        query: { user_id }
    }), [user_id]);

    useEffect(() => {

        async function loadSpots(){
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots( response.data )
        }
        loadSpots();

    }, []);

    useEffect(()=>{
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });

    }, [requests, socket]);

    async function handleApproval(booking_id, user_id){

        await api.post(`/bookings/${booking_id}/approvals`, {
            answer_to: user_id 
        });

        setRequests(requests.filter(request => request.id !== booking_id));

    }

    async function handleRejection(booking_id, user_id){

        await api.post(`/bookings/${booking_id}/rejections`,{
            answer_to: user_id
        });

        setRequests(requests.filter(request => request.id !== booking_id));
    }

    return(
        <>
            <ul className="notifications">
                {requests && requests.map(request => (
                    <li key={request.id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> na data <strong>{request.date}</strong>.
                        </p>
                        <button className="accept" onClick={ () => handleApproval(request.id, request.user.id) }>Aceitar</button>
                        <button className="reject" onClick={ () => handleRejection(request.id, request.user.id) }>Rejeitar</button>
                    </li>
                ))}

            </ul>
            <ul className="spot-list">
                { spots.map( spot => (
                    <li key={ spot.id }>
                        <header style={{ 
                            backgroundImage: `url(${spot.img_src})`
                         }}></header>
                        <h3>{ spot.company }</h3>
                        <span>{ spot.price ? `R$ ${spot.price}/dia` : 'Gratuito' }</span>
                    </li>
                )) }
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}