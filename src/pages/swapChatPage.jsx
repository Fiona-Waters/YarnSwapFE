import { Box, Divider, Heading, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/atoms/primaryButton";
import { MySendbirdApp } from "../components/organisms/sendbird";

export const SwapChatPage = () => {
    
    return (
        <>
        <Box>
            <Heading as='h3' size='lg' fontStyle='italic' > Swap Chat </Heading>
            
            <Spacer p='5px'/>
            <Text fontSize='xl'>
                Chat here to arrange postage or collection.
                <br></br>
                For more info and guidelines see our <Link to={'/about'}>ABOUT page.</Link>

            </Text>
            <Spacer p='2px'/>
           
        </Box>
            <MySendbirdApp />
        </>
    )

}