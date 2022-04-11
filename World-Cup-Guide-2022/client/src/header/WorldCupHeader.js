import React from "react";
import { Header } from "grommet";
import { grommet, Box, border, Image } from "grommet";


export const WorldCupHeader = () => {
    return(
        <Box className="Header"  border={{ color: 'grey', size: 'large' }} pad='none' Label="World Cup Guide 2022"> <h1 align="center" className="headerText">World Cup Guide 2022</h1>
            <Image  width="600px" height="135" alignSelf="center"  /> 
        </Box>
    )
}