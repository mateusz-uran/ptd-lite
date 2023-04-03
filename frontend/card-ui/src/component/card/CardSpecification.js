import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link, useOutletContext } from 'react-router-dom';
import TripTable from './TripTable';
import FuelTable from './FuelTable';
import useCardService from '../../services/CardServiceHook';
import GeneratePDF from '../GeneratePDF';
import LinearProgressWithLabel from '../misc/LinearProgressWithLabel';
import CustomSnackbar from '../misc/CustomSnackbar';

function CardSpecification(props) {
    const [cardId, cardNumber] = useOutletContext();
    const { getTripFromCard } = useCardService();
    const { getFuelFromCard } = useCardService();

    const [cardTrips, setCardTrips] = useState([]);
    const [cardFuels, setCardFuels] = useState([]);

    const [openBackDropTrips, setOpenBackdropTrips] = useState(false);
    const [openBackDropFuels, setOpenBackdropFuels] = useState(false);

    const [progress, setProgress] = useState(0);


    const [snackBarInformation, setSnackbarInformation] = useState({
        open: false,
        type: '',
        message: ''
    });


    useEffect(() => {
        setOpenBackdropTrips(true);
        setOpenBackdropFuels(true);

        getTripFromCard(cardId)
            .then(response => {
                setCardTrips(response.data);
                setOpenBackdropTrips(false);
            }, (error) => {
                setOpenBackdropTrips(false);
                console.log(error);
            })

        getFuelFromCard(cardId)
            .then(response => {
                setCardFuels(response.data);
                setOpenBackdropFuels(false);
            }, (error) => {
                setOpenBackdropFuels(false);
                console.log(error);
            })
    }, [cardId])

    return (
        <div>
            <CustomSnackbar
                open={snackBarInformation.open}
                description={snackBarInformation.message}
                severity={snackBarInformation.type}
                setOpen={setSnackbarInformation}
            />
            <div className='lg:px-5 my-2'>
                <div className='flex pb-1'>
                    <Link to={`../${cardId}/add-trip`} relative="path">
                        <Button variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Add Trip</Button>
                    </Link>

                    <Link to={`../${cardId}/add-fuel`} relative="path">
                        <Button variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Add Fuel</Button>
                    </Link>

                    {cardTrips && cardTrips.length > 1 && cardFuels && cardFuels.length > 0 &&
                        <GeneratePDF
                            cardNumber={cardNumber}
                            cardTrips={cardTrips}
                            cardFuels={cardFuels}
                            setProgress={setProgress}
                            setSnackbarInformation={setSnackbarInformation}
                        />
                    }
                </div>
                <div>
                    <LinearProgressWithLabel value={progress} />
                </div>
                {!openBackDropTrips && cardTrips && <TripTable cardId={cardId} cardTrips={cardTrips} openBackDropTrips={openBackDropTrips} />}
                {!openBackDropFuels && cardTrips && <FuelTable cardId={cardId} cardFuels={cardFuels} openBackDropFuels={openBackDropFuels} />}
            </div>
        </div>
    );
}

export default CardSpecification;
