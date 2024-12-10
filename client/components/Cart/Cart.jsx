import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Divider,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { useAuth } from "../../helpers/auth-context";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../helpers/CartContext.jsx";

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, emptyCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);

    const handleIncrement = (id) => {
        incrementQuantity(id);
    };

    const handleDecrement = (id) => {
        decrementQuantity(id);
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleCheckout = () => {
        emptyCart(); // Clear the cart
        setShowAlert(true); // Show the alert
    };
    
    const handleAlertDismiss = () => {
        setShowAlert(false); // Close the alert
        setTimeout(() => {
            window.location.reload(); // Reload the page AFTER the alert closes
        }, 300); // Add slight delay to ensure state updates propagate
    };

    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return isAuthenticated ? (
        <Box sx={{ margin: "0 auto", padding: "2rem", maxWidth: "800px" }}>
            {showAlert && (
    <Dialog
        open={showAlert}
        onClose={handleAlertDismiss}
        aria-labelledby="checkout-dialog-title"
        aria-describedby="checkout-dialog-description"
    >
        <DialogTitle id="checkout-dialog-title">Purchase Complete</DialogTitle>
        <DialogContent>
            <DialogContentText id="checkout-dialog-description">
                Thanks for your purchase! Click "Dismiss" to continue.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAlertDismiss} color="primary">
                Dismiss
            </Button>
        </DialogActions>
    </Dialog>
)}
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                fontWeight="bold"
                sx={{ mb: 3 }}
            >
                Your Cart
            </Typography>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <Paper
                            key={item._id}
                            sx={{
                                padding: "1rem",
                                marginBottom: "1rem",
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#eee",
                            }}
                        >
                            <Typography variant="h6" sx={{ width: "100%", textAlign: "center", margin: "1em 0" }}>{item.title}</Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}>
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "150px",
                                            maxHeight: "150px",
                                            minWidth: "150px",
                                            minHeight: "150px",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDecrement(item._id)}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography>{item.quantity}</Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleIncrement(item._id)}
                                        >
                                            <Add />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Divider sx={{ margin: "1rem 0" }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1rem 0",
                        }}
                    >
                        <Typography variant="h6">
                            Total: ${getTotalPrice().toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ padding: "0.5rem 2rem" }}
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    Your cart is empty.
                </Typography>
            )}
        </Box>
    ) : (
        <Typography
            variant="body1"
            textAlign="center"
            sx={{ margin: "2rem", color: "text.secondary" }}
        >
            Please log in to view your cart.
        </Typography>
        
    );
    
};

export default Cart;
