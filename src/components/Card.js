import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { display } from '@mui/system';
import { Button } from '@mui/material';
import { Public } from '@mui/icons-material';
import '../App.js';
import {useState} from 'react';


const Card = (props) => {
    var foregroundColor, backgroundColor;

    const [buttonPopup, setButtonPopup] = useState(false);

    if(props.Color == "green")
    {
        foregroundColor = "#1E731D";
        backgroundColor = "#D6EBD7";
    }
    else if(props.Color == "red")
    {
        foregroundColor = "#921313";
        backgroundColor = "#F8D9D9";
    }
    else
    {
        foregroundColor = "#7C775B";
        backgroundColor = "#E2DDAD";
    }

    return (
        <Grid item xs={3} sx={{marginTop:2}}>
            {/* <Button onClick={() => setButtonPopup(true) }> */}
                <Paper elevation={10} sx={{
                    height: 130,
                    width: 250,
                    paddingTop: 5,
                    borderRadius: 3,
                    marginLeft: 2,
                    backgroundColor: (backgroundColor)}} >
                    <Box justifyContent="center" sx={{
                            display: "flex", 
                            alignItems:"end", 
                            align:"center",
                            color: (foregroundColor)
                        }}>
                        <Typography align='center' variant='h2' component='h2'> 
                            {props.Value}    
                        </Typography>
                        <Typography align='center' variant='h7' component='h6'> 
                        {props.Unit}  
                        </Typography>
                    </Box>
                    <Typography align='center' variant='caption' component='h1' sx={{paddingTop: 4}}> 
                        {props.Heading}
                    </Typography>
                </Paper>
                
            {/* </Button>
            <ChartPopup trigger= {buttonPopup} ><h3>My Popup</h3></ChartPopup> */}
        </Grid>
        
    );
}


      
export default Card;