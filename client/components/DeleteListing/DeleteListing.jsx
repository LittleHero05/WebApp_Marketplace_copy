import React, { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { remove } from "../../frontend-ctrl/api-listing";
import { useAuth } from '../../helpers/auth-context';

const DeleteListing = ({ params, credentials }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleDelete = async () => {
        setLoading(true);
        try {
            const data = await remove({ params }, { t: isAuthenticated.token });
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(true);
                onDelete();
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to delete listing');
        }
    };

    return (
        <>
            <Button variant="outlined" color="error" onClick={handleDelete} disabled={loading}>
                Delete
            </Button>
            {loading && <CircularProgress />}
            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
                </Snackbar>
            )}
            {success && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert severity="success" onClose={() => setSuccess(false)}>Listing deleted successfully</Alert>
                </Snackbar>
            )}
        </>
    );
}

export default DeleteListing;