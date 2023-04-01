import React from 'react';
import usePdfService from '../services/PdfServiceHook';
import { Button } from '@mui/material';

function GeneratePDF(props) {
    const { cardNumber, cardTrips, cardFuels } = props;
    const { generatePdf } = usePdfService();

    const generate = () => {
        let pdfRequest = {
            number: cardNumber,
            cardTripsList: cardTrips,
            cardFuelsList: cardFuels,
        }
        generatePdf(pdfRequest)
            .then(response => {
                const file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);
                const pdfWindow = window.open();
                pdfWindow.location.href = fileURL;
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