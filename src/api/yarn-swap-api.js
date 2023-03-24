//const baseURL = "http://localhost:8080"
const baseURL = import.meta.env.VITE_BASE_URL
import { auth } from '../firebase';


export const getListings = async () => {
    try {
        const response = await fetch(
            `${baseURL}/listings`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addListing = async (newListing) => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
        const response = await fetch(
            `${baseURL}/listings`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ID-TOKEN': token
                },
                body: JSON.stringify(newListing)
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getSwaps = async () => {
    try {
        const response = await fetch(
            `${baseURL}/swaps`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addSwap = async (newSwap) => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
        const response = await fetch(
            `${baseURL}/swaps`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ID-TOKEN': token
                },
                body: JSON.stringify(newSwap)
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addUser = async (newUser) => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
        const response = await fetch(
            `${baseURL}/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ID-TOKEN': token
                },
                body: JSON.stringify(newUser)
            }
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getUserProfileById = async (listingUserId) => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
        const response = await fetch(
            `${baseURL}/user/${listingUserId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ID-TOKEN': token
                },
            }
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}



export const getUserProfile = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
        const response = await fetch(
            `${baseURL}/user/${auth.currentUser.uid}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ID-TOKEN': token
                },
            }
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await fetch(
            `${baseURL}/users`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getBrands = async () => {
    try {
        const response = await fetch(
            `${baseURL}/brands`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getWeights = async () => {
    try {
        const response = await fetch(
            `${baseURL}/weights`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getFibres = async () => {
    try {
        const response = await fetch(
            `${baseURL}/fibres`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getListingStatuses = async () => {
    try {
        const response = await fetch(
            `${baseURL}/listing-statuses`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};