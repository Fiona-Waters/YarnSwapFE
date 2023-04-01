import ProfileTable from "../../organisms/profileTable";
import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading } from "@chakra-ui/react";


export default function MyProfileTemplate(props) {

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 4
    })

    const { currentUser, navigateOnSave } = props;
    return (
        <VStack w="full" flex="1" spacing={12}>
            <ProfileTable currentUser={currentUser} navigateOnSave={navigateOnSave} />
        </VStack>
    )
}