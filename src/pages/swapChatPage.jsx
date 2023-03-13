import { Box, Button, Divider, Heading, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/atoms/primaryButton";
import { MySendbirdApp } from "../components/organisms/sendbird";

export const SwapChatPage = () => {

    return (
        <>
            <Box>
                <Heading as='h3' size='lg' fontStyle='italic' > Swap Chat </Heading>

                <Spacer p='2px' />
                <Text fontSize='xl'>
                    Chat here to arrange postage or collection.
                </Text>
                <Spacer p='10px' />

            </Box>
            <MySendbirdApp />
            <Spacer p='10px' />

            <Text fontSize='xl'> For more info and guidelines see our <Button as={Link} to="/about" bg='brand.blue' textColor='black'>About Page</Button>
            </Text>
            <Text fontSize='xl'>
                Return to  <Button as={Link} to="/swaps" bg='brand.blue' textColor='black'>Swaps Page</Button>
            </Text>
        </>
    )

}