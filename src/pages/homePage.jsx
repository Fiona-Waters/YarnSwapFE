import { getListings } from "../api/yarn-swap-api"
import HomePageTemplate from "../components/templates/homePageTemplate";
import { useQuery } from 'react-query';
import { Heading } from "@chakra-ui/react";

const HomePage = () => {
    const { data, isLoading } = useQuery('listings',
        getListings
    );


    if (isLoading) {
        return (
            <Heading as='h3' size='md'>Loading, please wait</Heading>
        )
    }

    return (
        <>
           
            <HomePageTemplate listings={data} />
        </>
    );
};

export default HomePage;