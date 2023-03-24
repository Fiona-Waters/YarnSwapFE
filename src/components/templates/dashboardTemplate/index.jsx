import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading, Input, filter } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import PrimaryButton from "../../atoms/primaryButton";
import Search from "../../atoms/search";
import AddListingForm from "../../organisms/addListingForm";
import Listing from "../../organisms/listing";

export default function DashboardTemplate(props) {

    const { listings, refreshListings, currentUser } = props

    const [listingToEdit, setListingToEdit] = useState()
    const [userListings, setUserListings] = useState([])
    const [filterBrand, setFilterBrand] = useState("")
    const [filterWeight, setFilterWeight] = useState("")
    const [filterFibre, setFilterFibre] = useState("")
    const [filterUsername, setFilterUsername] = useState("")
    const [filterStatus, setFilterStatus] = useState("")


    useEffect(() => {
        let l = [];
        listings?.map((listing) => {
            if (listing.userId == currentUser.uid) {
                l.push(listing)
            }
        })

        if (filterBrand) {
            l = l.filter((i) => i.brand?.toLowerCase().search(filterBrand.toLowerCase()) !== -1)
        }
        if (filterWeight) {
            l = l.filter((i) => i.weight?.toLowerCase().search(filterWeight.toLowerCase()) !== -1)
        }
        if (filterFibre) {
            l = l.filter((i) => i.fibreContent?.toLowerCase().search(filterFibre.toLowerCase()) !== -1)
        }
        if (filterUsername) {
            l = l.filter((i) => i.userName?.toLowerCase().search(filterUsername.toLowerCase()) !== -1)
        }
        if (filterStatus) {
            l = l.filter((i) => i.status?.toLowerCase().search(filterStatus.toLowerCase()) !== -1)
        }

        setUserListings(l)

    }, [listings, currentUser, filterBrand, filterWeight, filterFibre, filterUsername, filterStatus])

    const handleChange = (type, value) => {
        if (type === "brand") setFilterBrand(value)
        else if (type === "weight") setFilterWeight(value)
        else if (type === "fibre") setFilterFibre(value)
        else if (type === "username") setFilterUsername(value)
        else if (type === "status") setFilterStatus(value)
    }


    const initiateEditListing = (listing) => {
        setListingToEdit(listing)
        onOpen()
    }

    const initiateCreateListing = () => {
        setListingToEdit({})
        onOpen()
    }

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 4
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack w="full" flex="1" spacing={12} >
            <HStack w="full" >
                <PrimaryButton label={'Create Listing'} onClick={initiateCreateListing} />
                <Spacer />
                <Search onUserInput={handleChange} filterBrand={filterBrand} filterWeight={filterWeight} filterFibre={filterFibre} filterUsername={filterUsername} listings={listings} filterStatus={filterStatus} currentUser={currentUser.uid} isDashboard />
            </HStack>
            <Heading as='h3' size='md' alignSelf={"flex-start"} fontFamily={"sans-serif"} fontWeight={'bold'}>My Listings</Heading>
            <AddListingForm isOpen={isOpen} onClose={onClose} refreshListings={refreshListings} currentUser={currentUser} listing={listingToEdit} />
            <SimpleGrid p={'5'} columns={gridCount} spacing={'8'} w={'full'}>
                {userListings?.map((listing, i) => (
                    <Listing initiateEditListing={initiateEditListing} listing={listing} key={i} currentUser={currentUser} ></Listing>
                ))}

            </SimpleGrid>

        </VStack>
    )

}