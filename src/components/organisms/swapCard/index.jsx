import { Badge, ButtonGroup, Card, CardFooter, Divider, HStack, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { addListing, addSwap } from "../../../api/yarn-swap-api";
import { createSendbirdChannel } from "../../../sendbird";
import { PrimaryButton } from "../../atoms/primaryButton";
import { ListingHeadBody } from "../../molecules/listingHeadBody";

export function SwapCard(props) {
    const { swap, listing, listings, currentUser, refreshSwaps, refreshListings } = props
    var outgoingSwap = Boolean(listing.userId != currentUser.uid);
    var incomingSwap = Boolean(listing.userId === currentUser.uid);
    var swapDeclined = Boolean(swap.swap.swapStatus === "swap denied")
    var swapRequested = Boolean(swap.swap.swapStatus === "swap requested")
    var swapAccepted = Boolean(swap.swap.swapStatus === "swap accepted")
    var swapCancelled = Boolean(swap.swap.swapStatus === "swap cancelled")
    const navigate = useNavigate();

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
        if (swap.swap.swapStatus === "swap cancelled") {
            return (
                <Badge colorScheme={'purple'} fontSize='18px'>Swap Cancelled</Badge>
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
        swap.swap.swapStatus = "swap accepted"
        const newChannel = await createSendbirdChannel(currentUser.uid, swap.swap)
        swap.swap.chatChannelUrl = newChannel.url;
        await addSwap(swap.swap)
        refreshSwaps()
    }

    function goToChat() {
        navigate(`/swapchat`, {
            state: {
                chatUrl: swap.swap.chatChannelUrl
            }
        })
    }

    async function removeSwap() {
        swap.swap.swapStatus = "Archived"
        await addSwap(swap.swap)
        refreshSwaps()
    }

    async function cancelSwap() {
        swap.swap.swapStatus = "swap cancelled"
        await addSwap(swap.swap)
        swapListing.status = "Available"
        await addListing(swapListing)
        await refreshListings()
        await refreshSwaps()
    }

    // incoming swaps are those requested from me
    const incomingSwapButtons = () => {
        if (incomingSwap && swapRequested) {
            return (
                <ButtonGroup spacing='2'>
                    <PrimaryButton label='Accept' onClick={onSubmitAccepted} />
                    <PrimaryButton label='Decline' onClick={onSubmitDeclined} />
                </ButtonGroup>
            )
        }
        if (incomingSwap && swapAccepted) {
            return (
                <PrimaryButton label='Chat' onClick={goToChat} />
            )
        }
    }
    // outgoing swaps are my requests
    const outgoingSwapButtons = () => {
        if (outgoingSwap && swapRequested) {
            return (
                <PrimaryButton label='Cancel' onClick={cancelSwap} />
            )
        }
        if (outgoingSwap && swapDeclined) {
            return (
                <ButtonGroup spacing='2'>
                    <PrimaryButton label='Remove' onClick={removeSwap} />
                    <PrimaryButton label='Chat' onClick={goToChat} />
                </ButtonGroup>
            )
        }
        if (outgoingSwap && swapAccepted) {
            return (
                <PrimaryButton label='Chat' onClick={goToChat} />
            )
        }
        if (swapCancelled) {
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