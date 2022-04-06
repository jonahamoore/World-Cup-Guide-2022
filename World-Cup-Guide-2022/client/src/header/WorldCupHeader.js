import React from "react";
import { Header } from "grommet";
import { grommet, Box, border, Image } from "grommet";


export const WorldCupHeader = () => {
    return(
        <Box className="Header"  border={{ color: 'white', size: 'xlarge' }} pad='small' Label="World Cup Guide 2022"> <h1 align="center" className="headerText">World Cup Guide 2022</h1>
            <Image  width="600px" height="135" alignSelf="center"  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/2018_FIFA_World_Cup_Group_A_march_URU-KSA_-_Panorama.jpg"/> 
        </Box>
    )
}