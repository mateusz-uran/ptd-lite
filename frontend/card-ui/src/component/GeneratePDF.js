import React from 'react';
import usePdfService from '../services/PdfServiceHook';
import { Button } from '@mui/material';

function GeneratePDF(props) {
    const { cardNumber, cardTrips, cardFuels, setProgress, setSnackbarInformation } = props;
    const { generatePdf } = usePdfService();

    const generate = () => {
        let pdfRequest = {
            number: cardNumber,
            cardTripsList: cardTrips,
            cardFuelsList: cardFuels,
        }

        generatePdf(pdfRequest, (progressEvent) => {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        })
            .then(response => {
                const file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);
                const pdfWindow = window.open();
                pdfWindow.location.href = fileURL;
                setProgress(0);
            }, (error) => {
                console.log("Error: ", error);
                setSnackbarInformation(prevState => ({
                    ...prevState,
                    open: true,
                    type: 'warning',
                    message: 'Something went wrong, please try again later.',
                }))
                setProgress(0);
            });
    }

    return (
        <div>
            <Button onClick={() => generate()} variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Generate PDF</Button>
        </div>
    );
}

export default GeneratePDF;