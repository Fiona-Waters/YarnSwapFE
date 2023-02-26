import { getListings, getSwaps } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import { SwapsTemplate } from "../components/templates/swapsTemplate";

const SwapsPage = () => {
    const { data: swaps, isLoading: isLoading1, refetch: refetch1 } = useQuery('swaps',
        getSwaps
    );
    const { data: listings, isLoading: isLoading2, refetch: refetch2 } = useQuery('listings',
     getListings
    );
    const auth = getAuth()

    if (isLoading1) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <SwapsTemplate swaps={swaps} listings={listings} refreshListings={refetch2} refreshSwaps={refetch2} currentUser={auth.currentUser.uid} />

    );
};

export default SwapsPage;