import { Badge, ButtonGroup, Card, CardFooter, Divider, HStack, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/primaryButton";
import { ListingHeadBody } from "../../molecules/listingHeadBody";

export function SwapCard(props) {
    const { swap, listing } = props
    console.log("STATUS", swap.swap.swapStatus)
    /**
     * 
     * 
     */
    const badge = () => {
        if (swap.swap.swapStatus === "swap requested") {
            return (
                <Badge colorScheme={'yellow'} fontSize='18px'>Swap Requested</Badge>
            )
        }
        if (swap.swap.swapStatus === "swap denied") {
            return (
                <Badge colorScheme={'red'} fontSize='18px'>Swap Denied</Badge>
            )
        }
        if (swap.swap.swapStatus === "swap accepted") {
            return (
                <Badge colorScheme={'green'} fontSize='18px'>Swap Accepted</Badge>
            )
        }
    }
    function onSubmitDeclined() {
        // swap.swap.swapStatus == "swap declined"
        // call update swap function to update above
        // allow these to be removed from swap area?
    }

    function onSubmitAccepted() {
        //swap.swap.swapStatus == "swap accepted"
        //call update swap function to update above
        // create a chat between both users
        // add this chat to the swap - send to firebase
    }
    return (
        <>

            <Card maxW='lg' minW={56} align={"center"} p={5} border='4px' borderColor={'brand.blue'} >
                {badge()}
                <HStack divider={<StackDivider />} spacing='4'>
                    <ListingHeadBody listing={listing} />
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