import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useOutletContext } from 'react-router-dom';

function CardSpecification(props) {

    const [cardId] = useOutletContext();

    useEffect(() => {
    }, [cardId])

    return (
        <div className='lg:px-5 my-2'>
            {cardId}
        </div>
    );
}

export default CardSpecification;
