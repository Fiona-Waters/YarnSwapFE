import { Checkbox, Divider, FormControl, FormHelperText, FormLabel, HStack, VStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerFooter, Button, FormErrorMessage, useFormControlStyles } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useQuery } from "react-query";
import { addListing, getBrands, getFibres, getWeights } from "../../../api/yarn-swap-api";
import { PrimaryButton } from "../../atoms/primaryButton";
import { useForm } from "react-hook-form";

export function AddListingForm(props) {
    const { isOpen, onClose } = props;
    const { data: brands } = useQuery('getBrands', getBrands)
    const { data: weights } = useQuery('getWeights', getWeights)
    const { data: fibres } = useQuery('getFibres', getFibres)
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();

    function onSubmit(values) {
        addListing(values)
    }

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
                    <form onSubmit={handleSubmit(onSubmit)} id="add-listing-form">
                        <VStack spacing="6">

                            <FormControl>
                                <FormLabel htmlFor='brand'>Brand</FormLabel>
                                <Select id='brand'
                                    {...register('brand', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn brand'>
                                    {brands?.map((brand, i) => (
                                        <option value={brand.brandName}>{brand.brandName} </option>
                                    ))}
                                </Select>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='colourway'>Colourway</FormLabel>
                                <Input id='colourway' placeholder='Colourway' type='text' {...register('colourway', {
                                    required: 'This is required',
                                    minLength: { value: 3, message: 'Minimum length is 3 characters' },
                                })} />
                                <FormErrorMessage>
                                    {errors.colourway && errors.colourway.message}
                                </FormErrorMessage>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='weight'>Weight</FormLabel>
                                <Select id='weight'
                                    {...register('weight', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn weight'>
                                    {weights?.map((weight, i) => (
                                        <option value={weight.weightName}>{weight.weightName} </option>
                                    ))}
                                </Select>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='fibreContent'>Fibre Content</FormLabel>
                                <Select id='fibreContent'
                                    {...register('fibreContent', {
                                        required: 'This is required',
                                    })} placeholder='Choose a fibre'>
                                    {fibres?.map((fibre, i) => (
                                        <option value={fibre.fibreName}>{fibre.fibreName} </option>
                                    ))}
                                </Select>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='unitWeight'>Unit Weight (grams)</FormLabel>
                                <Input id='unitWeight' placeholder="100" type='number' {...register('unitWeight', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'please include weight in grams' },
                                })} />
                                <FormErrorMessage>
                                    {errors.unitWeight && errors.unitWeight.message}
                                </FormErrorMessage>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='meterage'>Length (metres)</FormLabel>
                                <Input id='meterage' placeholder="425" type='number' {...register('meterage', {
                                    required: 'This is required',
                                    minLength: { value: 3, message: 'please include length in metres' },
                                })} />
                                <FormErrorMessage>
                                    {errors.meterage && errors.meterage.message}
                                </FormErrorMessage>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='dyeLot'>Dyelot</FormLabel>
                                <Input id='dyeLot' placeholder="abc123" type='text' {...register('dyeLot')} />
                            </FormControl><FormControl>
                                <FormLabel htmlFor='originalCount'>Quantity</FormLabel>
                                <NumberInput id='originalCount' defaultValue={1} min={1} max={20} {...register('originalCount')}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl><FormControl>
                                <FormLabel htmlFor='swappable'>Yarn Destiny</FormLabel>
                                <RadioGroup name='swappable' id='swappable' >
                                    <Stack direction='row'>
                                        <Radio value='true'  {...register('swappable')}>Swap</Radio>
                                        <Radio value='false'  {...register('swappable')}>Stash</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl><FormControl>
                                {
                                    // TODO IMAGE UPLOAD
                                }
                                <FormLabel>Image</FormLabel>
                            </FormControl>

                        </VStack>
                    </form>
                </DrawerBody>
                <DrawerFooter minH="24">
                    <Button variant='outline' mr={4} onClick={onClose}>
                        Cancel
                    </Button>
                    <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="add-listing-form" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}