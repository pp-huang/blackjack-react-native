import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Game from './src/screens/Game';
import { IP_ADDRESS } from './config';

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://${IP_ADDRESS}:8000/`)
            .then((response) => {
                console.log('Successfully connected to server...');
                setData(response.data);
            })
            .catch((err) => {
                console.log('Error connecting to server: ' + err.message);
            });
    }, []);

    console.log('data: ', data);

    return <Game />;
}
