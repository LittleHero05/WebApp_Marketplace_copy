import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter.jsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { typography } from '@mui/system';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='layout'>
        <div className='content'>
          <Router>
            <MainRouter />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;