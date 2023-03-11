import { Badge, Container, Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logo } from "../components/atoms/logo";
import { MyProfileTemplate } from "../components/templates/profileTemplate";

const ProfilePage = () => {
    const auth = getAuth();

    const [user, loading, error] = useAuthState(auth)

    return (

        <Container p={'80px'} maxW="container.xl" centerContent>
            <Logo h={40} w={40} />
            <br></br>
            <Heading p={'5px'} alignItems={'center'}>User Profile</Heading>
            <br></br>
            <Badge colorScheme={'green'} fontSize='18px'>Please enter a username and click save to complete registration</Badge>
            <Badge colorScheme={'green'} fontSize='18px'>This username will be displayed publicly</Badge>
            <MyProfileTemplate currentUser={user} navigateOnSave={'/dashboard'}/>
        </Container>
    );
};

export default ProfilePage;