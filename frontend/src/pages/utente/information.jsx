
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from ".../api"; 

const DataFetcher = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the Flask API
        const fetchData = async () => {
            try {
                const response = await api.get('/data'); // Adjust the endpoint as needed
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Data from Flask API</h1>
            <p>{data.message}</p>
        </div>
    );
};

export default DataFetcher;
