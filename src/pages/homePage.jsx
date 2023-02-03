import { getListings } from "../api/yarn-swap-api"
import { HomePageTemplate } from "../components/templates/homePageTemplate";
import { useQuery } from 'react-query';
import { Logo } from "../components/atoms/logo";

const HomePage = () => {
    const { data, isLoading } = useQuery('listings',
        getListings
    );


    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <>
           
            <HomePageTemplate listings={data} />
        </>
    );
};

export default HomePage;