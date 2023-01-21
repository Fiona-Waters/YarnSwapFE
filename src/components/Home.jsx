import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <h1>This is the Home page</h1>
            <Link to="about">Click to view our about page</Link>
            <br></br>
            <Link to="Listings">Click to view our listings page</Link>
        </div>
    );
}

export default Home;