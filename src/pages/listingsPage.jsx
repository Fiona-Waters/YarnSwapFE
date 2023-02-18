import { getListings } from "../api/yarn-swap-api"
import { useQuery } from 'react-query';
import { getAuth } from "firebase/auth";
import { ListingsPageTemplate } from "../components/templates/listingsPageTemplate";

const ListingsPage = () => {
    const { data, isLoading, refetch } = useQuery('listings',
        getListings
    );

    const auth = getAuth()

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    // TODO return all apart from users own listings
    return (
        <ListingsPageTemplate listings={data} refreshListings={refetch} currentUser={auth.currentUser.uid}/>
        
    );
};

export default ListingsPage;