import { Button, ButtonGroup, Card, CardFooter, Popover, PopoverContent, PopoverTrigger, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { ListingHeadBody } from "../../molecules/listingHeadBody";
import { addListing, addSwap, addUser, getUserProfile, getUserProfileById } from "../../../api/yarn-swap-api";
import { useQuery } from 'react-query';
import { DeclinePopoverForm } from "../../atoms/popoverForm";

export function Listing(props) {
    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })
    const { listing, currentUser, refreshListings } = props
    const { isOpen, onClose, onOpen } = useDisclosure()
    if (currentUser) {
        var isListingOwner = Boolean(currentUser.uid == listing.userId)
    }
    const { data: user } = useQuery('getUserProfile', getUserProfile)
    const { data: listingUser } = useQuery(['getUserProfileById', listing?.userId], ({ queryKey }) => {
        console.log('queryKey', queryKey)
        return getUserProfileById(queryKey[1])
    })
    console.log(listingUser)

    // only allow a user to request a swap if they are active and have at least 1 token
    // by hiding swap button on listings page
    let swapPermission;
    if (user?.accountStatus == "Active" && user?.remainingTokens >= 1) {
        swapPermission = true;
    }
    let awaitingApproval;
    if (listing.status == "Awaiting approval") {
        awaitingApproval = true;
    }

    let isYarnSwappable;
    if (listing.swappable == true) {
        isYarnSwappable = "Yes"
    } else {
        isYarnSwappable = "No"
    }
    const { initiateEditListing } = props;

    const onEditClick = () => {
        initiateEditListing(listing)
    }

    let newSwap = {}
    async function onSubmitSwap() {
        const thisListing = listing
        thisListing.status = "Swap requested"
        await addListing(thisListing)
        newSwap.swapName = `${thisListing.brand} ${thisListing.colourway} Yarn Chat`
        newSwap.swapperUserID = listing.userId
        newSwap.SwappeeUserID = currentUser.uid;
        newSwap.listingID = listing.id
        newSwap.SwapStatus = "swap requested"
        try {
            await addSwap(newSwap)
        } catch (e) {
            console.log(e.message)
        }
        await refreshListings()
    }

    async function approveListing() {
        listing.status = "Available"
        await addListing(listing)
        const updatedListingUser = {
            ...listingUser,
            id: listing.userId,
            remainingTokens: listingUser.remainingTokens + 1
        }
        try {
            await addUser(updatedListingUser)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function onSubmitDeclined(values) {
        listing.status = "Declined"
        listing.listingNote = values?.listingNote
        console.log(values)
        console.log("listing", listing)
        await addListing(listing)
        onClose()
        await refreshListings()
        //TODO not refreshing listings
    }

    return (
        <Card maxW={72} minW={56} align={"center"} border='4px' p={0} borderColor={'brand.teal'} >
            <ListingHeadBody listing={listing} currentUser={currentUser} isYarnSwappable={isYarnSwappable} />
            {currentUser &&
                <CardFooter>
                    {isListingOwner
                        ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'edit'} onClick={onEditClick} >Edit</Button>
                        : <ButtonGroup spacing='3'>
                            {!awaitingApproval
                                ? <Button isDisabled={true} border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>Add to Wishlist</Button>
                                : <ButtonGroup>
                                    <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'approve listing'} onClick={approveListing} >Approve</Button>
                                    <Popover isOpen={isOpen} onClose={onClose}>
                                        <PopoverTrigger>
                                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'reject listing'} onClick={onOpen}>Decline</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <DeclinePopoverForm fieldname={'listingNote'} onSubmit={onSubmitDeclined} />
                                        </PopoverContent>
                                    </Popover>
                                </ButtonGroup>
                            }
                            {swapPermission && !awaitingApproval &&
                                <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'request swap'} onClick={onSubmitSwap} >Swap</Button>
                            }
                        </ButtonGroup>
                    }
                </CardFooter>
            }
        </Card>
    )
}