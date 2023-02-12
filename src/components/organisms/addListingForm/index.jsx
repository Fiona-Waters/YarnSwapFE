import { Checkbox, Divider, FormControl, FormHelperText, FormLabel, HStack, VStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerFooter, Button } from "@chakra-ui/react";
import React, { useState } from 'react';
import { PrimaryButton } from "../../atoms/primaryButton";

export function AddListingForm(props) {
    const [value, setValue] = useState('1')

    const { isOpen, onClose } = props;

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={"xl"}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader bg="brand.blue" minH="24">Add a Listing</DrawerHeader>
                <DrawerBody p="8">
                    <VStack spacing="6">
                        <FormControl>
                            <FormLabel>Brand</FormLabel>
                            <Select placeholder='Choose a yarn brand'>
                                <option value='option1'>Green Elephant Yarn</option>
                                <option value='option2'>Drops</option>
                                <option value='option3'>Sirdar</option>
                                <option value='option4'>Other</option>
                            </Select>
                        </FormControl><FormControl>
                            <FormLabel>Colourway</FormLabel>
                            <Input placeholder="Colourway" type='text' />
                        </FormControl><FormControl>
                            <FormLabel>Weight</FormLabel>
                            <Select placeholder='Choose a yarn weight'>
                                <option value='option1'>2ply Lace</option>
                                <option value='option2'>4ply Fingering</option>
                                <option value='option3'>8ply DK</option>
                                <option value='option4'>10ply Aran</option>
                                <option value='option5'>12ply Worsted</option>
                                <option value='option6'>Other</option>
                            </Select>
                        </FormControl><FormControl>
                            <FormLabel>Fibre Content</FormLabel>
                            <Select placeholder='Choose a fibre'>
                                <option value='option1'>Wool</option>
                                <option value='option2'>Acrylic</option>
                                <option value='option3'>Alpaca</option>
                                <option value='option4'>Merino</option>
                                <option value='option6'>Other</option>
                            </Select>
                        </FormControl><FormControl>
                            <FormLabel>Unit Weight (grams)</FormLabel>
                            <Input placeholder="100" type='number' />
                        </FormControl><FormControl>
                            <FormLabel>Length (metres)</FormLabel>
                            <Input placeholder="425" type='number' />
                        </FormControl><FormControl>
                            <FormLabel>Dyelot</FormLabel>
                            <Input placeholder="abc123" type='text' />
                        </FormControl><FormControl>
                            <FormLabel>Quantity</FormLabel>
                            <NumberInput defaultValue={1} min={1} max={20}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl><FormControl>
                            <FormLabel>Yarn Destiny</FormLabel>
                            <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row'>
                                    <Radio value='1'>Swap</Radio>
                                    <Radio value='2'>Stash</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl><FormControl>
                            {
                                // TODO IMAGE UPLOAD
                            }
                            <FormLabel>Image</FormLabel>
                        </FormControl>
                    </VStack>

                </DrawerBody>
                <DrawerFooter minH="24">
                    <Button variant='outline' mr={4} onClick={onClose}>
                        Cancel
                    </Button>
                    <PrimaryButton label="Save" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}