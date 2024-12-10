import { useState, useEffect } from "react";
import { useAuth } from "../../helpers/auth-context.jsx";
import { create } from "../../frontend-ctrl/api-listing.js";
import { list } from "../../frontend-ctrl/api-category.js";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Box,
    Typography,
    InputLabel,
    FormControl,
} from "@mui/material";

const NewListing = () => {
    const { isAuthenticated } = useAuth();
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await list();
                setCategories(response);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const [listing, setListing] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
        imageFile: null, // New state for image file
        location: {
            address: "",
            city: "",
            province: "",
            postalCode: "",
        },
        condition: "",
        status: "Active",
        postedBy: isAuthenticated?.user?._id,
    });

    const handleChange = (name) => (event) => {
        if (name === "imageFile") {
            setListing({ ...listing, imageFile: event.target.files[0] });
        } else if (name in listing.location) {
            setListing({
                ...listing,
                location: { ...listing.location, [name]: event.target.value },
            });
        } else {
            setListing({ ...listing, [name]: event.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isAuthenticated) {
            if (!listing.title || !listing.description || !listing.price || !listing.category || !listing.condition) {
                return;
            }

            try {
                const formData = new FormData();
                Object.entries(listing).forEach(([key, value]) => {
                    if (key === "location") {
                        Object.entries(value).forEach(([locKey, locValue]) =>
                            formData.append(`location[${locKey}]`, locValue)
                        );
                    } else if (key === "imageFile") {
                        formData.append("image", value); // Add the image file
                    } else {
                        formData.append(key, value);
                    }
                });

                console.log("FormData object:", formData);

                const response = await create(formData); // Send FormData
                console.log("Listing created:", response);
            } catch (err) {
                console.error("Error creating listing:", err);
            }
        } else {
            console.log("User not authenticated");
        }
    };

    return (
        <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                New Listing
            </Typography>
            {isAuthenticated ? (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    {/* Image Upload */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="image-upload"></InputLabel>
                        <TextField
                            type="file"
                            id="image-upload"
                            onChange={handleChange("imageFile")}
                        />
                    </FormControl>
                    {/* Title */}
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.title}
                        onChange={handleChange("title")}
                        required
                    />

                    {/* Description */}
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={listing.description}
                        onChange={handleChange("description")}
                        required
                    />

                    {/* Price */}
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.price}
                        onChange={handleChange("price")}
                        required
                    />

                    {/* Category */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={listing.category}
                            onChange={handleChange("category")}
                            required
                        >
                            <MenuItem value="">
                                <em>Select a category</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Location */}
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.address}
                        onChange={handleChange("address")}
                        required
                    />

                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.city}
                        onChange={handleChange("city")}
                        required
                    />

                    <TextField
                        label="Province"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.province}
                        onChange={handleChange("province")}
                        required
                    />

                    <TextField
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.postalCode}
                        onChange={handleChange("postalCode")}
                        required
                    />

                    {/* Condition */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="condition-label">Condition</InputLabel>
                        <Select
                            labelId="condition-label"
                            value={listing.condition}
                            onChange={handleChange("condition")}
                            required
                        >
                            <MenuItem value="">
                                <em>Select Condition</em>
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: "1.5rem" }}
                    >
                        Create Listing
                    </Button>
                </Box>
            ) : (
                <Typography color="error">
                    You must be logged in to create a listing.
                </Typography>
            )}
            {/* Dialogs */}
        </Box>
    );
};

export default NewListing;
