import {
    Divider, FormControl, FormLabel, VStack, Input,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
    Select, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton,
    DrawerHeader, DrawerFooter, Button, FormErrorMessage, Switch, Tooltip
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from "react-query";
import { addListing, getBrands, getFibres, getWeights } from "../../../api/yarn-swap-api";
import PrimaryButton from "../../atoms/primaryButton";
import { useForm } from "react-hook-form";
import ImageUploading from 'react-images-uploading'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import { InfoIcon } from "@chakra-ui/icons";

export default function AddListingForm(props) {
    const { isOpen, onClose, refreshListings, currentUser, listings, listing } = props;
    const { data: brands } = useQuery('getBrands', getBrands)
    const { data: weights } = useQuery('getWeights', getWeights)
    const { data: fibres } = useQuery('getFibres', getFibres)
    const listingMemo = useMemo(() => {
        return listing;
    }, [listing])
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset, setValue, } = useForm({ defaultValues: listingMemo });
    const [images, setImages] = React.useState([]);
    const [file, setFile] = React.useState("");
    const maxNumber = 1;
    const toast = useToast();
    var edit = listing?.id;
    var archived = Boolean(listing?.status === "Archived");
    var swappableTooltip = "Enable if you want to swap this yarn, otherwise it will not be viewable to other users."

    const onChange = async (imageList, addUpdateIndex) => {
        //data for submit
        const dataUrl = imageList[0]?.data_url
        const filename = imageList[0]?.file.name
        setImages(imageList)
        if (dataUrl) {
            const storageRef = ref(storage, `/files/${currentUser?.uid}/${filename}`)
            const uploadRes = await uploadString(storageRef, dataUrl, 'data_url');
            if (uploadRes.ref) {
                const downloadUrl = await getDownloadURL(uploadRes.ref)
                setValue('image', downloadUrl);
            }
        }
    };

    async function onSubmit(values) {
        values.userId = currentUser?.uid;
        values.swappable = values.swappable === true;
        // if the listing is being edited after being declined, mark it now as awaiting approval again
        if (listing?.status == "Declined") {
            values.status = "Awaiting approval"
        }
        // if the listing is being edited and the swappable variable is being updated to true, mark as awaiting approval
        if (listing?.swappable == false && values.swappable == true) {
            values.status = "Awaiting approval"
        }
        try {
            await addListing(values)
            onClose()
            reset()
            await refreshListings()
            setImages([])
        } catch (e) {
            console.log(e.message)
            setError('root.serverError', {
                message: e.message,
                type: '401'
            })
        }
    }
    const archiveListing = () => {
        listing.status = "Archived"
        toast({
            title: 'Listing Archived.',
            description: "Click the Save button to update your listing",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const unArchiveListing = () => {
        listing.status = "Available"
        toast({
            title: 'Listing Available.',
            description: "Click the Save button to update your listing",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const onCloseClicked = () => {
        reset()
        setImages([])
        onClose()
    }

    useEffect(() => {
        reset(listing);
    }, [listing])

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onCloseClicked}
            size={"xl"}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                {edit
                    ? <DrawerHeader bg="brand.blue" minH="24">Edit Listing</DrawerHeader>
                    : <DrawerHeader bg="brand.blue" minH="24">Add a Listing</DrawerHeader>
                }
                <DrawerBody>
                    {errors.root &&
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle></AlertTitle>
                            <AlertDescription>You are not authorised to perform this action</AlertDescription></Alert>}

                    <form onSubmit={handleSubmit(onSubmit)} id="add-listing-form">
                        <VStack spacing="6">
                            <Input type="hidden" {...register('id')} />
                            <Input type="hidden" {...register('status')} />
                            <FormControl isInvalid={!!errors.brand}>
                                <FormLabel htmlFor='brand'>Brand</FormLabel>
                                <Select id='brand' data-cy="select-brand"
                                    {...register('brand', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn brand'>
                                    {brands?.map((brand, i) => (
                                        <option value={brand.brandName} key={i}>{brand.brandName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.colourway}>
                                <FormLabel htmlFor='colourway'>Colourway</FormLabel>
                                <Input id='colourway' data-cy="add-listing-colourway" placeholder='Colourway' type='text' {...register('colourway', {
                                    required: 'This is required',
                                    minLength: { value: 3, message: 'Minimum length is 3 characters' },
                                })} />
                                <FormErrorMessage>
                                    {errors.colourway && errors.colourway.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.weight}>
                                <FormLabel htmlFor='weight'>Weight</FormLabel>
                                <Select id='weight' data-cy="select-weight"
                                    {...register('weight', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn weight'>
                                    {weights?.map((weight, i) => (
                                        <option value={weight.weightName} key={i}>{weight.weightName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.fibreContent}>
                                <FormLabel htmlFor='fibreContent'>Fibre Content</FormLabel>
                                <Select id='fibreContent' data-cy="select-fibre"
                                    {...register('fibreContent', {
                                        required: 'This is required',
                                    })} placeholder='Choose a fibre'>
                                    {fibres?.map((fibre, i) => (
                                        <option value={fibre.fibreName} key={i}>{fibre.fibreName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.fibreContent?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.unitWeight}>
                                <FormLabel htmlFor='unitWeight'>Unit Weight (grams)</FormLabel>
                                <Input data-cy="add-listing-unitWeight" id='unitWeight' placeholder="100" type='number' {...register('unitWeight', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'please include weight in grams' },
                                    valueAsNumber: true
                                })} />
                                <FormErrorMessage>
                                    {errors.unitWeight && errors.unitWeight.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.meterage}>
                                <FormLabel htmlFor='meterage'>Length (metres)</FormLabel>
                                <Input data-cy="add-listing-meterage" id='meterage' placeholder="425" type='number' {...register('meterage', {
                                    required: 'This is required',
                                    minLength: { value: 3, message: 'please include length in metres' },
                                    valueAsNumber: true
                                })} />
                                <FormErrorMessage >
                                    {errors.meterage && errors.meterage.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.dyeLot}>
                                <FormLabel htmlFor='dyeLot'>Dyelot</FormLabel>
                                <Input data-cy="add-listing-dyelot" id='dyeLot' placeholder="abc123" type='text' {...register('dyeLot')} />
                                <FormErrorMessage>{errors.dyeLot?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.originalCount}>
                                <FormLabel htmlFor='originalCount'>Quantity</FormLabel>
                                <NumberInput data-cy="add-listing-originalCount" id='originalCount' defaultValue={1} min={1} max={20} {...register('originalCount', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'please include a quantity' },
                                    valueAsNumber: true
                                })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>{errors.originalCount?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>

                                <FormLabel htmlFor='swappable'>Swappable
                                    <Tooltip label={swappableTooltip} placement='right-end'>
                                        <InfoIcon boxSize={6} paddingLeft={"3px"} color='blue' />
                                    </Tooltip>
                                </FormLabel>
                                <Switch data-cy="add-listing-swappable" {...register('swappable', {
                                })} />
                            </FormControl>
                            <FormControl isInvalid={!!errors.image}>
                                <FormLabel htmlFor="image">Image</FormLabel>

                                <div className="App">
                                    <ImageUploading 
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            <div className="upload__image-wrapper">
                                                <Button data-cy="add-listing-image" border={'2px'} backgroundColor={'brand.blue'} borderColor={'gray.500'} textColor={'black'}
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    Click here to upload an image or drag and drop
                                                </Button>
                                                &nbsp;
                                                {imageList.map((image, i) => (
                                                    <div key={i} className="image-item">
                                                        <img src={image['data_url']} alt="" width="100" />
                                                        <div className="image-item__btn-wrapper">
                                                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'}
                                                                onClick={() => onImageUpdate(i)}>Update Image</Button>
                                                            <Divider />
                                                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'red.200'} textColor={'black'} onClick={() => onImageRemove(i)}>Remove Image</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                    <Input type="hidden" {...register('image', { required: "This is required" })} />
                                </div>
                                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                            </FormControl>

                        </VStack>
                    </form>
                </DrawerBody>
                <DrawerFooter minH="24">
                    {edit && !archived &&
                        <PrimaryButton label="Archive Listing" size="md" p="8" onClick={archiveListing} />
                    }
                    <br></br>
                    {archived &&
                        <PrimaryButton label="Make Active" size="md" p="8" onClick={unArchiveListing} />

                    }
                    <Divider />
                    <Button variant='outline' mr={4} onClick={onCloseClicked} >
                        Cancel
                    </Button>
                    <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="add-listing-form" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}