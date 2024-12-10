import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context.jsx';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [favourites, setFavourites] = useState([]);
    
    // Load favourites from local storage when the component mounts
    useEffect(() => {
        if (isAuthenticated) {
        const savedFavourites = localStorage.getItem(`favourites_${isAuthenticated.user._id}`);
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
        }
    }, [isAuthenticated]);
    
    // Save favourites to local storage whenever it changes
    useEffect(() => {
        if (isAuthenticated) {
        localStorage.setItem(`favourites_${isAuthenticated.user._id}`, JSON.stringify(favourites));
        }
    }, [favourites, isAuthenticated]);
    
    const addToFavourites = (item) => {
        setFavourites((prevItems) => {
        const existingItem = prevItems.find((i) => i._id === item._id);
        if (existingItem) {
            return prevItems;
        } else {
            return [...prevItems, item];
        }
        });
    };
    
    const removeFromFavourites = (id) => {
        setFavourites((prevItems) => prevItems.filter((item) => item._id !== id));
    };
    
    return (
        <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
        {children}
        </FavouritesContext.Provider>
    );
}

