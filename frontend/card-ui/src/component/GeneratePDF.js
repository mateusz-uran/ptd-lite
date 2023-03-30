import React from 'react';
import usePdfService from '../services/PdfServiceHook';
import { Button } from '@mui/material';

function GeneratePDF(props) {
    const { cardNumber, cardAuthor, cardTrips, cardFuels} = props;
    const { generatePdf } = usePdfService();

    const generate = (cardNumber, cardAuthor, cardTrips, cardFuels) => {
        let payload = {
            number: cardNumber,
            author: cardAuthor,
            cardTripsList: cardTrips,
            cardFuelsList: cardFuels,
        }
        generatePdf(payload)
            .then(response => {
                console.log("Response: ", response.data)
            }, (error) => {
                console.log("Error: ", error);
            });
    }

    return (
        <div>
            <Button onClick={() => generate(cardNumber, cardAuthor, cardTrips, cardFuels)} variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Generate PDF</Button>
        </div>
    );
}

export default GeneratePDF;