import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { remove } from '../../frontend-ctrl/api-user.js';
import { useAuth } from '../../helpers/auth-context';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import './DeleteProfile.css';

const DeleteAccount = () => {
  const { isAuthenticated, logout } = useAuth();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    const jwt = isAuthenticated;
    remove({ userId: jwt.user._id }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        logout(() => {
          setRedirectToHome(true);
        });
      }
    });
  };

  if (redirectToHome) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="delete-account-container">
      <Button variant="outlined" color="error" onClick={handleClickOpen} style={{marginTop: '0.5em', width: '100%', marginBottom: '0'}}>
        Delete Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;