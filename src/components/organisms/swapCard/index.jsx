import { Badge, ButtonGroup, Card, CardFooter, Divider, HStack, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { addListing, addSwap } from "../../../api/yarn-swap-api";
import { PrimaryButton } from "../../atoms/primaryButton";
import { ListingHeadBody } from "../../molecules/listingHeadBody";

export function SwapCard(props) {
    const { swap, listing, listings, currentUser, refreshSwaps, refreshListings } = props
    var outgoingSwap = Boolean(listing.userId != currentUser);
    var incomingSwap = Boolean(listing.userId === currentUser);
    var swapDeclined = Boolean(swap.swap.swapStatus === "swap denied")
    var swapRequested = Boolean(swap.swap.swapStatus === "swap requested")

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

    let swapListing;
    listings?.map((listing) => {
        if (listing.id === swap.swap.listingId) {
            swapListing = listing
        }
    })

    async function onSubmitDeclined() {
        swap.swap.swapStatus = "swap denied"
        const thisSwap = swap.swap
        thisSwap.swapStatus = "swap denied"
        await addSwap(thisSwap)
        swapListing.status = "Available"
        await addListing(swapListing)
        await refreshListings()
        await refreshSwaps()
        
    }

    async function onSubmitAccepted() {
        swap.swap.swapStatus == "swap accepted"
        //call update swap function to update above
        // create a chat between both users
        // add this chat to the swap - send to firebase
    }

    async function removeSwap() {
        swap.swap.swapStatus = "Archived"
        const thisSwap = swap.swap
        thisSwap.swapStatus = "Archived"
        await addSwap(thisSwap)
        await refreshSwaps()
    }

    const incomingSwapButtons = () => {
        if (incomingSwap && swapRequested) {
            return (
                <ButtonGroup spacing='2'>
                    <PrimaryButton label='Accept' />
                    <PrimaryButton label='Decline' onClick={onSubmitDeclined} />
                </ButtonGroup>
            )
        }
        // if (incomingSwap && swapDeclined) {
        //     return (
        //         <PrimaryButton label='Remove' onClick={removeSwap} />
        //     )
        // }
    }

    const outgoingSwapButtons = () => {
        if (outgoingSwap && swapDeclined) {
            return (
                <PrimaryButton label='Remove' onClick={removeSwap} />
            )
        }
    }


    return (
            <Card maxW='lg' minW={56} align={"center"} p={5} border='4px' borderColor={'brand.blue'} >
                {badge()}
                <HStack divider={<StackDivider />} spacing='4'>
                    <ListingHeadBody listing={swapListing} />
                </HStack>
                <br></br>
                <CardFooter>
                    {incomingSwapButtons()}
                    {outgoingSwapButtons()}
                </CardFooter>
            </Card>
    )
}