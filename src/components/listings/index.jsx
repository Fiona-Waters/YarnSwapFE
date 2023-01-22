import { Link } from "react-router-dom"

function Home(props) {
    
    return (
        <div>
            <h1>This is the Home page</h1>
            <br></br>
            <h1>Array of Listings from Firebase</h1>
            <p>{JSON.stringify(props.listings)}</p>
            <br></br>
            <h1>List of Listing id, brand and weight</h1>
            <ul>
                {props.listings?.map((listing) => {
                    return (
                        <li key={listing.id}>{listing.id} {listing.brand} {listing.weight}</li>
                    )
                })}
            </ul>
            <br></br>
            <Link to="about">Click to view our about page</Link>
            <br></br>
            <Link to="Listings">Click to view our listings page</Link>
        </div>
    );
}

export default Home;