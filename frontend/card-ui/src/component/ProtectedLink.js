import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ProtectedLink(props) {
    return (
        <div>
            <Link to={"/protected"} relative="path">
                <Button variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>Admin</Button>
            </Link>
        </div>
    );
}

export default ProtectedLink;