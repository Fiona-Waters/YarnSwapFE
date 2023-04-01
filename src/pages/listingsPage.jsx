import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import ListingsPageTemplate from "../components/templates/listingsPageTemplate";
import { Heading } from "@chakra-ui/react";

const ListingsPage = () => {
    const { data, isLoading, refetch } = useQuery('listings',
        getListings
    );

    const auth = getAuth()

    if (isLoading) {
        return (
            <Heading as='h3' size='md'>Loading, please wait</Heading>
        )
    }
    return (
        <ListingsPageTemplate listings={data} refreshListings={refetch} currentUser={auth.currentUser} />
    );
};

export default ListingsPage;