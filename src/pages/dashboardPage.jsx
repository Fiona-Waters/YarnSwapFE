import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import DashboardTemplate from "../components/templates/dashboardTemplate";
import { Heading } from "@chakra-ui/react";

const DashboardPage = () => {
    const { data, isLoading, refetch } = useQuery('listings',
        getListings
    , {
        cacheTime:180000,
        staleTime:180000
    });

    const auth = getAuth()

    if (isLoading) {
        return (
            <Heading as='h3' size='md'>Loading, please wait</Heading>
        )
    }
    return (
        <DashboardTemplate listings={data} refreshListings={refetch} currentUser={auth.currentUser} />
    );
};

export default DashboardPage;