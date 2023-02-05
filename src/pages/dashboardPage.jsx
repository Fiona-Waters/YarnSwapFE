import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';

const DashboardPage = () => {
    const { data, isLoading } = useQuery('listings',
        getListings
    );


    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    // TODO return users own listings etc see wireframe
    return (
        <>
        </>
    );
};

export default DashboardPage;