import { Avatar, Box, Container, Divider, Heading, HStack, Spacer, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { DarkModeButton } from '../atoms/darkModeButton';
import { Logo } from '../atoms/logo';
import { PrimaryButton } from '../atoms/primaryButton';
import { NavigationMenu } from '../organisms/nav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { getUserProfile } from '../../api/yarn-swap-api';
import NavBar from '../atoms/responsiveNav';

function MainLayout() {
    const navigate = useNavigate();
    const auth = getAuth();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error logging out", error)
        });
    }

    const [user, loading, error] = useAuthState(auth)
    const { data, isLoading } = useQuery('getUserProfile', getUserProfile)

    if (isLoading) {
        return <Heading as='h3' size='md' alignContent='center'>Loading, please wait</Heading>
    }

    // if there is a user but no user profile navigate to the profile page
    if (user && (data?.userName == "" || !data) && !isLoading) {
        navigate("/profile")
        return
    }


    if (loading) {
        return (
            <div>
                <p>Logging in...</p>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        )
    }
    if (user) {
        return (
            <>
                <HStack w="full" p={4}>
                    <DarkModeButton />
                    <Spacer />
                    {auth.currentUser.photoURL &&
                        <Wrap>
                            <WrapItem>
                                <Avatar name={auth.currentUser.displayName} src={auth.currentUser.photoURL} />
                            </WrapItem>
                        </Wrap>
                    }
                    <Text fontSize='lg'>Logged in as {data?.userName}</Text>
                    <Divider orientation='vertical' />
                    <Text fontSize='lg'>Tokens : {data?.remainingTokens}</Text>
                    <Divider orientation='vertical' />

                    <PrimaryButton onClick={handleLogout} label={'Logout'} />

                </HStack>
                <Container maxW="container.xl" centerContent>

                    <Logo h={40} w={40} />
                    <br></br>
                    <NavBar/>
                    <Stack flex="1" w="full" pt={12} >
                        <Outlet />
                    </Stack>
                </Container>
            </>
        )
    } else {
        return <Navigate replace to="/" />
    }
}

export default MainLayout; 