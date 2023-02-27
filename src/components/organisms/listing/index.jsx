import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Image, List, ListItem, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { ListingHeadBody } from "../../molecules/listingHeadBody";
import { addListing, addSwap } from "../../../api/yarn-swap-api";
import { useState } from "react";

export function Listing(props) {
    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })
    const { listing, currentUser, refreshListings } = props

    var isListingOwner = Boolean(currentUser.uid == listing.userId)
    //TODO only allow swap if user has a token!
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