import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === "" || formData.email === "" || formData.subject === "" || formData.message === "") {
            setErrorOpen(true);
            return;
        }

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false); // Close the dialog
    };

    const handleCloseError = () => {
        setErrorOpen(false); // Close the dialog
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }} style={{height: 'auto'}}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight={'bold'}>
                    Contact Us
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    We'd love to hear from you. Fill out the form below to get in touch.
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    {/* Name Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    {/* Subject Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    {/* Message Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Submit
                </Button>
            </Box>

            {/* Thank You Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="thank-you-dialog-title"
                aria-describedby="thank-you-dialog-description"
            >
                <DialogTitle id="thank-you-dialog-title">
                    Thank You!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="thank-you-dialog-description">
                        Thanks for getting in touch. We'll get back to you as soon as possible!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={errorOpen}
                onClose={handleCloseError}
                aria-labelledby="error-dialog-title"
                aria-describedby="error-dialog-description"
            >
                <DialogTitle id="error-dialog-title">
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="thank-you-dialog-description">
                        Please fill out all fields before submitting the form.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseError} color="error" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Contact;
