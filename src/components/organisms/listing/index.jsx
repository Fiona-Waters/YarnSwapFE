import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Image, List, ListItem, useBreakpointValue } from "@chakra-ui/react";
import { InfoRow } from "../../atoms/infoRow";

export function Listing(props) {

    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })

    const { listing } = props

    return (
        <Card maxW={72} minW={56} align={"center"} border='4px' borderColor={'brand.teal'} >
            <CardHeader>
                <Box>
                    <Image boxSize='170px' objectFit='cover' borderRadius='lg' src="data:image/jpeg;base64,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" />
                    {listing?.image} </Box>
            </CardHeader>
            <CardBody>
                <List>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Brand"} value={listing?.brand}/>
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Colourway"} value={listing?.colourway}/>
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Weight"} value={listing?.weight}/>
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Fibre Content"} value={listing?.fibreContent}/>
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Swappable"} value={listing?.swappable} />
                    </ListItem>
                    <ListItem borderBottomColor={'brand.blue'} borderBottomWidth={'1px'}>
                        <InfoRow label={"Status"} value={listing?.status?.statusName}/>
                    </ListItem>
                </List>
            </CardBody>
            
            <CardFooter >
                <ButtonGroup spacing='3'>
                    <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>Add to Wishlist</Button>
                    <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'request swap'}>Swap</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}