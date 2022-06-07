import React, { useState, useHook } from "react";

import Typography from '@mui/material/Typography';

import "../App.css";

export default function About() {
 
        return (
            <div>
                <Typography sx={{fontSize: 'medium'}}>Miniswap is the compilation of each swap on each chain in one place.  Each swap is using the
                RouterV2 smart contract on the backend to complete swaps in a decentralized way.  Users can switch networks seamlessly and perform
                swaps immediately. </Typography>
            </div>
        )
    
}