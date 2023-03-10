import { Button, ButtonGroup, Card, CardFooter, Popover, PopoverContent, PopoverTrigger, useBreakpointValue } from "@chakra-ui/react";
import { ListingHeadBody } from "../../molecules/listingHeadBody";
import { addListing, addSwap, getUserProfile } from "../../../api/yarn-swap-api";
import { useQuery } from 'react-query';
import { DeclinePopoverForm } from "../../atoms/popoverForm";

export function Listing(props) {
    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })
    const { listing, currentUser, refreshListings } = props
    if (currentUser) {
        var isListingOwner = Boolean(currentUser.uid == listing.userId)
    }
    const { data: user } = useQuery('getUserProfile', getUserProfile)
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
        thisListing.status = "Unavailable"
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
        refreshListings()
    }
  
    async function approveListing() { 
        listing.status = "Available"
        await addListing(listing)
        // TODO add flag to listing to show approved? or just show at top of users dashboard?

    }


    function rejectListing() { 
//        listing.status = "Declined"
//        listing.note =values.// whatever the admin users enters in decline form
        // change listing status to declined and provide a reason (badge on listing card?)
        // add flag to listing in users dashboard
    }

    return (
        <Card maxW={72} minW={56} align={"center"} border='4px' p={0} borderColor={'brand.teal'} >
            <ListingHeadBody listing={listing} currentUser={currentUser} isYarnSwappable={isYarnSwappable} />
            {currentUser
                ? <CardFooter>
                    {isListingOwner
                        ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'edit'} onClick={onEditClick} >Edit</Button>

                        : <ButtonGroup spacing='3'>
                            {!awaitingApproval
                                ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>Add to Wishlist</Button>
                                : <ButtonGroup>
                                    <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'approve listing'} onClick={approveListing} >Approve</Button>
                                   <Popover>
                                    <PopoverTrigger>
                                    <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'reject listing'} onClick={rejectListing} >Decline</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <DeclinePopoverForm/>
                                    </PopoverContent>
                                    </Popover>
                                </ButtonGroup>
                            }
                            {swapPermission && !awaitingApproval
                                ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'request swap'} onClick={onSubmitSwap} >Swap</Button>
                                : <></>
                            }
                        </ButtonGroup>
                    }
                </CardFooter>

                : <></>
            }
        </Card>
    )
}