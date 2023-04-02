import { Badge, Button, ButtonGroup, Card, CardFooter, HStack, Popover, PopoverContent, PopoverTrigger, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { addListing, addSwap, addUser, getUserProfileById } from "../../../api/yarn-swap-api";
import createSendbirdChannel from "../../../sendbird";
import DeclinePopoverForm from "../../atoms/popoverForm";
import PrimaryButton from "../../atoms/primaryButton";
import ListingHeadBody from "../../molecules/listingHeadBody";

export default function SwapCard(props) {
    const { swap, listing, listings, currentUser, refreshSwaps, refreshListings } = props
    var outgoingSwap = Boolean(listing?.userId != currentUser?.uid);
    var incomingSwap = Boolean(listing?.userId === currentUser?.uid);
    var swapDeclined = Boolean(swap?.swap?.swapStatus === "swap denied")
    var swapRequested = Boolean(swap?.swap?.swapStatus === "swap requested")
    var swapAccepted = Boolean(swap?.swap?.swapStatus === "swap accepted")
    var swapCancelled = Boolean(swap?.swap?.swapStatus === "swap cancelled")
    var parcelSent = Boolean(swap?.swap?.swapStatus === "parcel sent")
    var swapCompleted = Boolean(swap?.swap?.swapStatus === "swap completed")
    var swapDate = swap?.swap?.timestamp
    const navigate = useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { data: swappee } = useQuery(['getUserProfileById', swap?.swap?.swappeeUserId], ({ queryKey }) => {
        return getUserProfileById(queryKey[1])
    })

    const badge = () => {
        switch (swap?.swap?.swapStatus) {
            case "swap requested":
                return (
                    <Badge colorScheme={'yellow'} fontSize='18px'>Swap Requested</Badge>
                )
            case "swap denied":
                return (
                    <Badge colorScheme={'red'} fontSize='18px'>Swap Denied</Badge>
                )
            case "swap accepted":
                return (
                    <Badge colorScheme={'green'} fontSize='18px'>Swap Accepted</Badge>
                )
            case "swap cancelled":
                return (
                    <Badge colorScheme={'purple'} fontSize='18px'>Swap Cancelled</Badge>
                )
            case "parcel sent":
                return (
                    <Badge colorScheme={'pink'} fontSize='18px'>Parcel Sent</Badge>
                )
            case "swap completed":
                return (
                    <Badge colorScheme={'orange'} fontSize='18px'>Swap Completed</Badge>
                )
        }
    }

    let swapListing;
    listings?.map((listing) => {
        if (listing.id === swap?.swap.listingId) {
            swapListing = listing
        }
    })

    async function onSubmitAccepted() {
        swap.swap.swapStatus = "swap accepted"
        const newChannel = await createSendbirdChannel(currentUser?.uid, swap?.swap)
        swap.swap.chatChannelUrl = newChannel.url;
        try {
            await addSwap(swap?.swap)
        } catch (e) {
            console.log("error adding swap", e.message)
        }
        await refreshSwaps()
    }

    function goToChat() {
        navigate(`/swapchat`, {
            state: {
                chatUrl: swap?.swap.chatChannelUrl
            }
        })
    }

    async function removeSwap() {
        swap.swap.swapStatus = "Archived"
        try {
            await addSwap(swap.swap)
        } catch (e) {
            console.log("error adding swap", e.message)
        }
        await refreshSwaps()
    }

    async function cancelSwap() {
        swap.swap.swapStatus = "swap cancelled"
        try {
            await addSwap(swap.swap)

        } catch (e) {
            console.log("error adding swap", e.message)
        }
        swapListing.status = "Available"
        try {
            await addListing(swapListing)
        } catch (e) {
            console.log("error adding listing", e.message)
        }
        await refreshListings()
        await refreshSwaps()
    }

    async function onSubmitDeclined(values) {
        swap.swap.swapStatus = "swap denied"
        swap.swap.swapNote = values?.swapNote
        console.log("swap decline", values)
        try {
            await addSwap(swap.swap)
        } catch (e) {
            console.log("error updating swap", e.message)
        }
        swapListing.status = "Available"
        try {
            await addListing(swapListing)
        } catch (e) {
            console.log("error adding listing", e.message)
        }
        onClose()
        await refreshListings()
        await refreshSwaps()
    }

    async function onParcelSent() {
        swap.swap.swapStatus = "parcel sent"
        try {
            await addSwap(swap.swap)

        } catch (e) {
            console.log("error adding swap", e.message)
        }
        await refreshSwaps()
    }

    async function completeSwap() {
        swap.swap.swapStatus = "swap completed"
        try {
            await addSwap(swap.swap)
        } catch (e) {
            console.log("error adding swap", e.message)
        }
        swapListing.status = "Archived"
        try {
            await addListing(swapListing)
        } catch (e) {
            console.log("error adding swap listing", e.message)
        }
        const updatedSwappee = {
            ...swappee,
            id: swap?.swap?.swappeeUserId,
            remainingTokens: swappee.remainingTokens - 1
        }
        try {
            await addUser(updatedSwappee)
        } catch (e) {
            console.log("error updating swappee user", e.message)
        }
        await refreshSwaps()
        await refreshListings()
    }

    // incoming swaps are those requested from me
    const incomingSwapButtons = () => {
        if (incomingSwap && swapRequested) {
            return (
                <ButtonGroup spacing='2'>
                    <PrimaryButton label='Accept' onClick={onSubmitAccepted} />
                    <Popover isOpen={isOpen} onClose={onClose}>
                        <PopoverTrigger>
                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'reject swap'} onClick={onOpen}>Decline</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <DeclinePopoverForm onSubmit={onSubmitDeclined} fieldname={'swapNote'} />
                        </PopoverContent>
                    </Popover>
                </ButtonGroup>
            )
        }
        if (incomingSwap && swapAccepted) {
            return (
                <ButtonGroup spacing='2'>
                    <PrimaryButton label='Chat' onClick={goToChat} />
                    <PrimaryButton label='Parcel Sent' onClick={onParcelSent} />
                </ButtonGroup>
            )
        }
        if (parcelSent) {
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
                </ButtonGroup>
            )
        }
        if (outgoingSwap && swapAccepted) {
            return (
                <PrimaryButton label='Chat' onClick={goToChat} />
            )
        }
        if (swapCancelled || swapCompleted) {
            return (
                <PrimaryButton label='Remove' onClick={removeSwap} />
            )
        }
        if (outgoingSwap && parcelSent) {
            return (
                <PrimaryButton label='Parcel received' onClick={completeSwap} />
            )
        }
    }


    return (
        <Card maxW='lg' minW={56} align={"center"} p={5} border='4px' borderColor={'brand.blue'} >
            {badge()}
            {outgoingSwap && swapDeclined &&
                <Text as='mark' noOfLines={3}> Reason: {swap?.swap?.swapNote}</Text>
            }
            <HStack divider={<StackDivider />} spacing='4'>
                <ListingHeadBody listing={swapListing} />
            </HStack>
            {swapDate && <div>
                Swap requested on - {swapDate}
            </div>
            }
            <br></br>
            <CardFooter>
                {incomingSwapButtons()}
                {outgoingSwapButtons()}
            </CardFooter>
        </Card>
    )
}