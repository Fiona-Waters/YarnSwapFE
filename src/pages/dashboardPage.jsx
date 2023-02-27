import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import { DashboardTemplate } from "../components/templates/dashboardTemplate";

const DashboardPage = () => {
    const { data, isLoading, refetch } = useQuery('listings',
        getListings
    );

    const auth = getAuth()

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <DashboardTemplate listings={data} refreshListings={refetch} currentUser={auth.currentUser} />
    );
};

export default DashboardPage;