import React from 'react';
import usePdfService from '../services/PdfServiceHook';
import { Button } from '@mui/material';

function GeneratePDF(props) {
    const { cardNumber, cardTrips, cardFuels} = props;
    const { generatePdf, readFile } = usePdfService();

    const generate = () => {
        let pdfRequest = {
            number: cardNumber,
            cardTripsList: cardTrips,
            cardFuelsList: cardFuels,
        }
        generatePdf(pdfRequest)
            .then(response => {
                console.log("Response: ", response.data)
            }, (error) => {
                console.log("Error: ", error);
            });
    }

    return (
        <div>
            <Button onClick={() => generate()} variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Generate PDF</Button>
        </div>
    );
}

export default GeneratePDF;