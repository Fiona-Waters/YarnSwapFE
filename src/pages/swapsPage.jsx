import { getListings, getSwaps } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import { SwapsTemplate } from "../components/templates/swapsTemplate";

const SwapsPage = () => {
    const { data, isLoading, refetch } = useQuery('swaps',
        getSwaps
    );

    console.log("data", data)

    const auth = getAuth()

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <SwapsTemplate swaps={data} refreshListings={refetch} currentUser={auth.currentUser.uid}/>
        
    );
};

export default SwapsPage;