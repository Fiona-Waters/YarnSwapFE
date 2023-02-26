import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Image, List, ListItem, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { auth } from "../../../firebase";
import { InfoRow } from "../../atoms/infoRow";
import { ListingHeadBody } from "../../molecules/listingHeadBody";
import { addListing, addSwap } from "../../../api/yarn-swap-api";
import { useState } from "react";

export function Listing(props) {
    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })
    const { listing, currentUser, refreshListings } = props

    var isListingOwner = Boolean(currentUser == listing.userId)

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

    if (listing.status == "Archived") {
        const message = "This listing has been Archived"
    }

    const [ isClicked, setIsClicked ] = useState(false)
    
    let newSwap = {}
    console.log("before",listing.status)
    async function onSubmitSwap() {
        // if(!isClicked) setIsClicked(true)
        // disabled = {isClicked}
        const thisListing = listing
        thisListing.status = "Unavailable"
        await addListing(thisListing)
        console.log("thislisting after", thisListing.status)
        newSwap.swapperUserID = listing.userId
        newSwap.SwappeeUserID = currentUser;
        newSwap.listingID = listing.id
        newSwap.SwapStatus = "swap requested"
        try {
            await addSwap(newSwap)
        } catch (e) {
            console.log(e.message)
        }
        refreshListings()
    }

    return (
        <Card maxW={72} minW={56} align={"center"} border='4px' p={0} borderColor={'brand.teal'} >
            <ListingHeadBody listing={listing} currentUser={currentUser} isYarnSwappable={isYarnSwappable} />
            {currentUser
                ? <CardFooter>
                    {isListingOwner
                        ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'edit'} onClick={onEditClick} >Edit</Button>

                        : <ButtonGroup spacing='3'>
                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>Add to Wishlist</Button>
                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'request swap'} onClick={onSubmitSwap} >Swap</Button>
                        </ButtonGroup>
                    }
                </CardFooter>

                : <></>
            }
        </Card>
    )
}