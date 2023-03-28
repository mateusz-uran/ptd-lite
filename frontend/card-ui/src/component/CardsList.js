import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardSpecification(props) {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8181/api/card/live")
            .then((response) => {
                setData(response.data);
            });
    }, [])

    return (
        <div>
            {data}
        </div>
    );
}

export default CardSpecification;