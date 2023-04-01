import { getListings, getSwaps } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import SwapsTemplate from "../components/templates/swapsTemplate";
import { Heading } from "@chakra-ui/react";


const SwapsPage = () => {
    const { data: swaps, isLoading: isLoading1, refetch: refetchSwaps } = useQuery('swaps',
        getSwaps
        ,
        {
            staleTime: 10000
        });
    const { data: listings, isLoading: isLoading2, refetch: refetchListing } = useQuery('listings',
        getListings
    );
    const auth = getAuth()

    if (isLoading1) {
        return (
            <Heading as='h3' size='md'>Loading, please wait</Heading>
        )
    }
    return (
        <SwapsTemplate swaps={swaps} listings={listings} refreshListings={refetchListing} refreshSwaps={refetchSwaps} currentUser={auth.currentUser} />
    );
};

export default SwapsPage;