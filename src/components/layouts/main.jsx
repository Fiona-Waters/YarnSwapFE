import { Box, Container, Flex, HStack, Spacer, Stack, VStack } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { Outlet, Link, useNavigate, Router, Navigate } from 'react-router-dom';
import { DarkModeButton } from '../atoms/darkModeButton';
import { Logo } from '../atoms/logo';
import { PrimaryButton } from '../atoms/primaryButton';
import { NavigationMenu } from '../organisms/nav';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    console.log("USER", auth.currentUser)

    const [user, loading, error] = useAuthState(auth)


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
                    <Spacer />
                    <DarkModeButton />
                    <PrimaryButton onclick={handleLogout} label={'Logout'} />

                </HStack>
                <Container maxW="container.xl" centerContent>

                    <Logo h={40} w={40} />
                    <NavigationMenu />
                    <Stack flex="1" w="full" pt={12}>
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