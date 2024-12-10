import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { read } from "../../frontend-ctrl/api-user.js";
import { useAuth } from "../../helpers/auth-context";
import { Card, CardContent, Typography, CircularProgress, Avatar, Button, Fab, Tooltip } from "@mui/material";
import EditProfile from "../EditProfile/EditProfile.jsx";
import DeleteProfile from "../DeleteProfile/DeleteProfile.jsx";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState(null);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Utility functions for generating avatar initials and color
    const stringAvatar = (name) => {
        const nameParts = name.split(" ");
        const initials =
            nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : `${nameParts[0][0]}${nameParts[0][1] || ""}`;

        return {
            sx: { bgcolor: stringToColor(name) },
            children: initials.toUpperCase(),
        };
    };

    const stringToColor = (string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    // Fetch user data
    const fetchUserProfile = async () => {
        const jwt = isAuthenticated;
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }

        try {
            const data = await read({ userId: jwt.user._id }, { t: jwt.token });
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setRedirectToSignin(true);
        }
    };

    // Ensure the profile data is fetched once
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isAuthenticated?.user) {
                // Refresh the page to ensure authentication context loads
                window.location.reload();
            } else {
                fetchUserProfile();
            }
        }, 500);
    
        return () => clearTimeout(timeoutId);
    }, [isAuthenticated]);

    if (redirectToSignin) {
        return <Navigate to="/signin" />;
    }

    if (loading) {
        return (
            <div className="profile-container">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="profile-container">
            <Card className="profile-card">
                <CardContent className="profile-content">
                    <div className="profile-header">
                        <Avatar {...stringAvatar(user.name)} style={{ marginRight: "0.5em" }} />
                        <Typography variant="h6" className="profile-title">
                            Profile
                        </Typography>
                    </div>
                    <Typography variant="body1">
                        Name: <span style={{ fontWeight: "bold" }}>{user.name}</span>
                    </Typography>
                    <Typography variant="body1">
                        Email: <span style={{ fontWeight: "bold" }}>{user.email}</span>
                    </Typography>
                    <Typography variant="body1">
                        Joined: <span style={{ fontWeight: "bold" }}>{new Date(user.created).toDateString()}</span>
                    </Typography>

                    {/* Edit Profile Button */}
                    {isEditing ? (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setIsEditing(false)}
                            style={{ marginTop: "1em" }}
                            className="toggle-cancel"
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={() => setIsEditing(true)}
                            style={{ marginTop: "1em" }}
                            className="toggle-edit"
                        >
                            Edit Profile
                        </Button>
                    )}
                    {isEditing ? null : <DeleteProfile userId={user._id} />}
                </CardContent>

                {/* Floating Action Buttons */}
                <div className="profile-actions">
                    <Tooltip title="Add Listing" arrow>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => navigate("/newListing")}
                            className="fab-button addListing"
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Tooltip title="My Listings" arrow>
                        <Fab
                            color="secondary"
                            aria-label="view"
                            onClick={() => navigate("/myListings")}
                            className="fab-button viewListings"
                        >
                            <VisibilityIcon />
                        </Fab>
                    </Tooltip>
                </div>

                {isEditing && <EditProfile user={user} />}
            </Card>
        </div>
    );
};

export default Profile;
