import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Image, List, ListItem, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { InfoRow } from "../../atoms/infoRow";

export function Listing(props) {
    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })
    let isListingOwner;
    const { listing, currentUser } = props
    if (currentUser == listing.userId) {
        isListingOwner = true
    } else {
        isListingOwner = false
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

    if (listing.status == "Archived") {
        const message = "This listing has been Archived"
    }
   


    return (
        <Card maxW={72} minW={56} align={"center"} border='4px' p={0} borderColor={'brand.teal'} >
            <CardHeader >
                <Box>
                    <Image boxSize='190px' objectFit='cover' borderRadius='lg' src={listing?.image} />
                </Box>
            </CardHeader>
            <CardBody w={'full'}>
                <List>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Brand"} value1={listing?.brand} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Colourway"} value1={listing?.colourway} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Fibre Content"} value1={listing?.fibreContent} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Weight"} value1={listing?.weight + " /"} value2={listing.unitWeight + 'g'} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Length(m)"} value1={listing?.meterage} />
                    </ListItem>
                    {listing.dyeLot && <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Dye Lot"} value1={listing?.dyeLot} />
                    </ListItem>}
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Amount"} value1={listing?.originalCount} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Swappable"} value1={isYarnSwappable} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Status"} value1={listing?.status} />
                    </ListItem>
                </List>
            </CardBody>
            <CardFooter>
                {isListingOwner
                    ? <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'edit'} onClick={onEditClick} >Edit</Button>

                    : <ButtonGroup spacing='3'>
                        <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>Add to Wishlist</Button>
                        <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'request swap'}>Swap</Button>
                    </ButtonGroup>
                }
            </CardFooter>
        </Card>
    )
}