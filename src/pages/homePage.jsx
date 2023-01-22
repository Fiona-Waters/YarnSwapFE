import { getListings } from "../api/yarn-swap-api"
import Home from "../components/listings";
import {useQuery} from 'react-query';

const HomePage = () => {
    const {data, isLoading} = useQuery('listings',
        getListings
    );
    
    
    if(isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Home
        listings={data} />
    );
};

export default HomePage;