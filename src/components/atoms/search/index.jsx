import { Button, Card, CardBody, Input, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBrands, getFibres, getWeights } from "../../../api/yarn-swap-api";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { PrimaryButton } from "../primaryButton";

export function Search(props) {
    const { listings } = props;
    const [searchTerm, setSearchTerm] = useState('')
    const { data: brands } = useQuery('getBrands', getBrands)
    const { data: weights } = useQuery('getWeights', getWeights)
    const { data: fibres } = useQuery('getFibres', getFibres)
    console.log("brands", brands)
    console.log("weights", weights)
    console.log("fibres", fibres)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()


    return (

        <div>
            <PrimaryButton label={'Search...'} ref={btnRef} onClick={onOpen} />

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {/* <Card>
                <CardBody>
                <Input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} focusBorderColor='brand.blue' border={'2px'} borderColor={'gray.500'}/>

                </CardBody>
            </Card>
            <Input type="text" onChange={(e) => {
                setFilterBrand(e.target.value)
                
            }} />
            <Input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} focusBorderColor='brand.blue' border={'2px'} borderColor={'gray.500'}/>
            {listings?.filter((val) => {
                if (searchTerm == "") {
                    return val
                } else if (val.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {
                return <div>{val.brand}</div>
            })} */}
        </div>
    )
}