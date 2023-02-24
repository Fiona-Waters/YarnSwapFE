import { Box, CardBody, CardFooter, CardHeader, Image, List, ListItem } from "@chakra-ui/react";
import { InfoRow } from "../../atoms/infoRow";

export function ListingHeadBody(props) {
    const { listing, currentUser, isYarnSwappable } = props;
    return (

        <>

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
                        <InfoRow label={"Weight"} value1={listing?.weight + " /"} value2={listing?.unitWeight + 'g'} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Length(m)"} value1={listing?.meterage} />
                    </ListItem>
                    {listing?.dyeLot && <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
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
        </>
    )
}