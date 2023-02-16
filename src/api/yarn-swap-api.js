export const getListings = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/listings"
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
            "http://localhost:8080/listings"
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newListing)
        });
        console.log("THIS ONE",JSON.stringify(newListing))
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        console.log("HELLO addListing", response.json);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getBrands = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/brands"
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getWeights = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/weights"
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getFibres = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/fibres"
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}