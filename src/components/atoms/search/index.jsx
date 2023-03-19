import { Button, Card, CardBody, Divider, Heading, Input, MenuItem, Select, Spacer, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBrands, getFibres, getListingStatuses, getUserProfile, getUsers, getWeights } from "../../../api/yarn-swap-api";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { PrimaryButton } from "../primaryButton";
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

export function Search(props) {
    const { listings, onUserInput, filterBrand, filterWeight, filterFibre, filterUsername, filterStatus, currentUser, isDashboard } = props;
    const [searchTerm, setSearchTerm] = useState('')
    const { data: brands } = useQuery('getBrands', getBrands)
    const { data: weights } = useQuery('getWeights', getWeights)
    const { data: fibres } = useQuery('getFibres', getFibres)
    const { data: users } = useQuery('getUsers', getUsers)
    const { data: listingStatuses } = useQuery('getListingStatuses', getListingStatuses)
    console.log(isDashboard)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const handleChange = (e, type, value) => {
        e.preventDefault();
        onUserInput(type, value)
    }

    const handleBrandChange = (e) => {
        handleChange(e, "brand", e.target.value)
    }

    const handleWeightChange = (e) => {
        handleChange(e, "weight", e.target.value)
    }
    const handleFibreChange = (e) => {
        handleChange(e, "fibre", e.target.value)
    }

    const handleStatusChange = (e) => {
        handleChange(e, "status", e.target.value)
    }
    const handleUsernameChange = (e, props) => {
        handleChange(e, "username", e.target.value)
    }

    return (

        <div>
            <PrimaryButton label={'Filter...'} ref={btnRef} onClick={onOpen} />

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'md'}
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader bg="brand.blue" minH="24">Search & Filter</DrawerHeader>

                    <DrawerBody>
                        <FormLabel> Search Brands </FormLabel>
                        <Input type='search' value={filterBrand} placeholder='Type here...' onChange={handleBrandChange} />
                        <Spacer p='20px' />
                        <Divider />
                        <Spacer p='20px' />
                        <FormControl>
                            <FormLabel> Filter by Brand</FormLabel>
                            <Select placeholder="All" value={filterBrand} onChange={handleBrandChange}>
                                {brands?.map((brand) => {
                                    return (
                                        <option key={brand.brandName} value={brand.brandName}>
                                            {brand.brandName}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Spacer p='10px' />

                        <FormControl>
                            <FormLabel>Filter by Weight</FormLabel>
                            <Select placeholder="All" value={filterWeight} onChange={handleWeightChange}>
                                {weights?.map((weight) => {
                                    return (
                                        <option key={weight.weightName} value={weight.weightName}>
                                            {weight.weightName}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Spacer p='10px' />

                        <FormControl>
                            <FormLabel>Filter by Fibre</FormLabel>
                            <Select placeholder="All" value={filterFibre} onChange={handleFibreChange}>
                                {fibres?.map((fibre) => {
                                    return (
                                        <option key={fibre.fibreName} value={fibre.fibreName}>
                                            {fibre.fibreName}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>



                        <Spacer p='10px' />
                        {!isDashboard &&
                            <>
                                <FormControl>
                                    <FormLabel>Filter by User</FormLabel>
                                    <Select placeholder="All" value={filterUsername} onChange={handleUsernameChange}>
                                        {users?.map((user) => {
                                            return (
                                                <option key={user.userName} value={user.userName}>
                                                    {user.userName}
                                                </option>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <Spacer p='10px' />
                            </>
                        }

                        {isDashboard &&
                            <FormControl>
                                <FormLabel>Filter by Listing Status</FormLabel>
                                <Select placeholder="All" value={filterStatus} onChange={handleStatusChange}>
                                    {listingStatuses?.map((status) => {
                                        return (
                                            <option key={status.statusName} value={status.statusName}>
                                                {status.statusName}
                                            </option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}