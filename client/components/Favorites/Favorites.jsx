import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useFavorites } from '../../helpers/FavoritesContext';
import ListingCard from '../ListingCard/ListingCard';

const Favorites = () => {
  const { favoriteItems } = useFavorites();

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      {favoriteItems.length > 0 ? (
        <Grid container spacing={2}>
          {favoriteItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <ListingCard listing={item} isFavorite={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">You have no favorite items.</Typography>
      )}
    </Box>
  );
};

export default Favorites;