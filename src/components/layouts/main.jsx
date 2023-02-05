import { Box, Flex, HStack, Spacer, VStack } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { DarkModeButton } from '../atoms/darkModeButton';
import { Logo } from '../atoms/logo';
import { PrimaryButton } from '../atoms/primaryButton';
import { NavigationMenu } from '../organisms/nav';

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
    return (

        <VStack h="full" w="full" minH="100vh" spacing={12} pt={120}>
            <HStack>
                <Box>
                    <DarkModeButton />
                </Box>
                <Box>
                    <PrimaryButton onclick={handleLogout} label={'Logout'} />
                </Box>
            </HStack>
            <Box>
                <Logo h={40} w={40} />
            </Box>
            <Box>
                <NavigationMenu />
            </Box>

            <Outlet />

        </VStack>
    )
}

export default MainLayout; 