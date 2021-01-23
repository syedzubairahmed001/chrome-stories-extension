import React from 'react';

export const UserContext = React.createContext({
    user: {
        name: null,
        email: null,
        profilePicture: null
    },
    isAuthenticated: false,
})