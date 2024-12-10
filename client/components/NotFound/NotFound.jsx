import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      textAlign="center"
    >
      <Typography variant="h2" >
        404 Not Found
      </Typography>
      <Typography variant="h6" gutterBottom marginBottom={'1.3em'}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="error" href="/" size='large'>
        Take Me Home
      </Button>
    </Box>
  );
};

export default NotFound;