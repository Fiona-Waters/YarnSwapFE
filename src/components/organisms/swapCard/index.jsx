import { Badge, ButtonGroup, Card, CardFooter, Divider, HStack, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/primaryButton";
import { ListingHeadBody } from "../../molecules/listingHeadBody";

export function SwapCard(props) {
/**
 *  badges - Swap requested(yellow), swap denied(red), swap accepted(green)
 */
   

    const { listings, swap } = props
    return (
        <>

            <Card maxW='lg' minW={56} align={"center"} p={5} border='4px' borderColor={'brand.blue'} >
                <Badge colorScheme={'yellow'} fontSize='18px'>Swap Requested</Badge>
                <Badge colorScheme={'green'} fontSize='18px'>Swap Accepted</Badge>
                <Badge colorScheme={'red'} fontSize='18px'>Swap Denied</Badge>

                <HStack divider={<StackDivider />} spacing='4'>
                    <ListingHeadBody listings={listings} swap={swap} />
                </HStack>
                <br></br>
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <PrimaryButton label='Accept' />
                        <PrimaryButton label='Decline' />
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
}