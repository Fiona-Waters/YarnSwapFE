export const getListings = () => {
    return fetch(
        "http://localhost:8080/listings"
    )
    .then((response) => {
        if(!response.ok) {
            throw new Error(response.json().message);
        }
        console.log("HELLO",response.json)
        return response.json();
    })
    .catch((error) => {
        throw error;
    });
};