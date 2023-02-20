//const baseURL = "http://localhost:8080"
const baseURL = import.meta.env.VITE_BASE_URL


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
    console.log("NEW LISTING", newListing)
    try {
        const response = await fetch(
            `${baseURL}/listings`
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newListing)
        });
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