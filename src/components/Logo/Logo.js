import React from 'react';
import { Box, withStyles } from '@material-ui/core';
import { LogoStyles } from './LogoStyles';
import LogoImage from './LogoImage';


const Logo = ({ classes }) => {
  return (
    <Box m={3}>
      <LogoImage className={classes.logoSVG}/>
    </Box>
  );
};

export default withStyles(LogoStyles)(Logo);