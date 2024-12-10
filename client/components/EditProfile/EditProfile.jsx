import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { read, update } from '../../frontend-ctrl/api-user.js';
import { useAuth } from '../../helpers/auth-context';
import { Card, CardContent, Typography, TextField, Button, CircularProgress } from '@mui/material';
import './EditProfile.css';

const EditProfile = () => {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();
        const signal = abortController.signal;

        const jwt = isAuthenticated;
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }

        read({ userId: jwt.user._id }, { t: jwt.token }, signal).then((data) => {
            if (isMounted) {
                if (data && data.error) {
                    setRedirectToSignin(true);
                } else {
                    setUser(data);
                    setValues({ ...values, name: data.name, email: data.email });
                    setLoading(false);
                }
            }
        }).catch(err => {
            if (isMounted) {
                console.error(err);
            }
        });

        return function cleanup() {
            isMounted = false;
            abortController.abort();
        };
    }, [isAuthenticated]);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = () => {
        const jwt = isAuthenticated;
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };

        update({ userId: jwt.user._id }, { t: jwt.token }, user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, userId: data._id, success: true });
            }
        });

        window.location.reload();
    };

    if (redirectToSignin) {
        return <Navigate to="/signin" />;
    }

    if (values.success) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="edit-profile-container">
            {loading ? (
                <CircularProgress />
            ) : (
                <Card className="edit-profile-card">
                    <CardContent>
                        <Typography variant="h6">Edit Profile</Typography>
                        <TextField
                            id="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange('email')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange('password')}
                            margin="normal"
                            fullWidth
                        />
                        {values.error && (
                            <Typography color="error" variant="body2">
                                {values.error}
                            </Typography>
                        )}
                    </CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={clickSubmit}
                            style={{ width: '100%' }}
                        >
                            Submit
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default EditProfile;