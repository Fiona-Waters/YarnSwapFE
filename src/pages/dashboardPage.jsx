import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import { DashboardTemplate } from "../components/templates/dashboardTemplate";

const DashboardPage = () => {
    const { data, isLoading, refetch } = useQuery('listings',
        getListings
    );

    const auth = getAuth()

    console.log("AUTH",auth.currentUser.uid)


    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    // TODO return users own listings etc see wireframe
    return (
        <DashboardTemplate listings={data} refreshListings={refetch} currentUser={auth.currentUser.uid}/>
        
    );
};

export default DashboardPage;