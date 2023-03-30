import React from 'react';
import usePdfService from '../services/PdfServiceHook';
import { Button } from '@mui/material';

function GeneratePDF(props) {
    const { cardNumber, cardAuthor, cardTrips, cardFuels} = props;
    const { generatePdf, readFile } = usePdfService();

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

    const read = (cardAuthor) => {
        let username = "mateusz"
        readFile(username)
        .then(response => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <Button onClick={() => generate(cardNumber, cardAuthor, cardTrips, cardFuels)} variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Generate PDF</Button>
            <Button onClick={() => read(cardAuthor)}>Read</Button>
        </div>
    );
}

export default GeneratePDF;