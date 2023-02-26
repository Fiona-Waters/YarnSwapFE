import {
    Divider, FormControl, FormLabel, VStack, Input,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
    Select, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton,
    DrawerHeader, DrawerFooter, Button, FormErrorMessage, Portal, useBoolean, Switch
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from "react-query";
import { addListing, getBrands, getFibres, getListings, getWeights } from "../../../api/yarn-swap-api";
import { PrimaryButton } from "../../atoms/primaryButton";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export function AddListingForm(props) {
    const { isOpen, onClose, refreshListings, currentUser, listings, listing } = props;
    const { data: brands } = useQuery('getBrands', getBrands)
    const { data: weights } = useQuery('getWeights', getWeights)
    const { data: fibres } = useQuery('getFibres', getFibres)
    const listingMemo = useMemo(() => {
        return listing;
    }, [listing])
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset, setValue, } = useForm({ defaultValues: listingMemo });
    const [images, setImages] = React.useState([]);
    const [ file, setFile ] = React.useState("");
    const maxNumber = 1;
    const toast = useToast();
    const [ swappable, setSwappable, ] = useBoolean(listing?.swappable);
    var edit = listing?.id;
    var archived = Boolean(listing?.status === "Archived");
  //  console.log("SWAPPABLE, useBoolean", swappable)
    
    const onChange = (imageList, addUpdateIndex) => {
        //data for submit
        console.log("imagelist", imageList)
        const dataUrl = imageList[0]?.data_url
        setValue('image', dataUrl)
        setImages(imageList)
    };
    const onSwappableChanged = () => {
 //       console.log("IM FIRING")
        setSwappable.toggle()
        setValue('swappable', swappable)
    }

    async function onSubmit(values) {
        values.userId = currentUser;
        values.swappable = values.swappable === true;
        if (values.swappable === true) {
            values.status = "Available"
        } else {
            values.status = "Unavailable"
        }

        values.status = values.status
        try {
            await addListing(values)
            onClose()
            reset()
            refreshListings()
            setImages([])
            setSwappable.off()
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
        //        onClose()
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
        //    onClose()
    }
    useEffect(() => {
        reset(listing);
    }, [listing])

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first")
        }
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                //update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
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
                {edit
                    ? <DrawerHeader bg="brand.blue" minH="24">Edit Listing</DrawerHeader>
                    : <DrawerHeader bg="brand.blue" minH="24">Add a Listing</DrawerHeader>
                }
                <DrawerBody p="8">
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
                                <Select id='brand'
                                    {...register('brand', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn brand'>
                                    {brands?.map((brand, i) => (
                                        <option value={brand.brandName}>{brand.brandName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.colourway}>
                                <FormLabel htmlFor='colourway'>Colourway</FormLabel>
                                <Input id='colourway' placeholder='Colourway' type='text' {...register('colourway', {
                                    required: 'This is required',
                                    minLength: { value: 3, message: 'Minimum length is 3 characters' },
                                })} />
                                <FormErrorMessage>
                                    {errors.colourway && errors.colourway.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.weight}>
                                <FormLabel htmlFor='weight'>Weight</FormLabel>
                                <Select id='weight'
                                    {...register('weight', {
                                        required: 'This is required',
                                    })} placeholder='Choose a yarn weight'>
                                    {weights?.map((weight, i) => (
                                        <option value={weight.weightName}>{weight.weightName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.fibreContent}>
                                <FormLabel htmlFor='fibreContent'>Fibre Content</FormLabel>
                                <Select id='fibreContent'
                                    {...register('fibreContent', {
                                        required: 'This is required',
                                    })} placeholder='Choose a fibre'>
                                    {fibres?.map((fibre, i) => (
                                        <option value={fibre.fibreName}>{fibre.fibreName} </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.fibreContent?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.unitWeight}>
                                <FormLabel htmlFor='unitWeight'>Unit Weight (grams)</FormLabel>
                                <Input id='unitWeight' placeholder="100" type='number' {...register('unitWeight', {
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
                                <Input id='meterage' placeholder="425" type='number' {...register('meterage', {
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
                                <Input id='dyeLot' placeholder="abc123" type='text' {...register('dyeLot')} />
                                <FormErrorMessage>{errors.dyeLot?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.originalCount}>
                                <FormLabel htmlFor='originalCount'>Quantity</FormLabel>
                                <NumberInput id='originalCount' defaultValue={1} min={1} max={20} {...register('originalCount', {
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
                                <FormLabel htmlFor='swappable'>Swappable</FormLabel>
                                <Switch  {...register('swappable', {
                                    setValueAs: swappable
                                })}/>
                                <Input type="hidden" {...register('swappable')} />
                            </FormControl>
                            {/* <FormControl isInvalid={!!errors.swappable}>
                                <FormLabel htmlFor='swappable'>Yarn Destiny</FormLabel>
                                <Select {...register('swappable', {
                                    required: 'This is required'
                                })}>
                                    <option value={true}>Swap</option>
                                    <option value={false}>Stash</option>
                                </Select>
                                <FormErrorMessage>{errors.swappable?.message}</FormErrorMessage>
                            </FormControl> */}
                            <FormControl isInvalid={!!errors.image}>
                                <FormLabel htmlFor="image">Image</FormLabel>

                                <div className="App">
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={handleChange}
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
                                                <Button border={'2px'} borderColor={'gray.500'} textColor={'black'}
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    Click here to upload an image or just drag and drop
                                                </Button>
                                                <Button onClick={handleUpload}>Add to firebase</Button>
                                                &nbsp;
                                                <Divider />
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image['data_url']} alt="" width="100" />
                                                        <div className="image-item__btn-wrapper">
                                                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'}
                                                                onClick={() => onImageUpdate(index)}>Update Image</Button>
                                                            <Divider />
                                                            <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'red.200'} textColor={'black'} onClick={() => onImageRemove(index)}>Remove Image</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                    <Input type="file" {...register('image', { required: false })} />
                                </div>
                                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                            </FormControl>

                        </VStack>
                    </form>
                </DrawerBody>
                <DrawerFooter minH="24">
                    {edit && !archived
                        ? <PrimaryButton label="Archive Listing" size="md" p="8" onClick={archiveListing} />
                        : <></>
                    }
                    <br></br>
                    {archived
                        ? <PrimaryButton label="Make Listing Active" size="md" p="8" onClick={unArchiveListing} />
                        : <></>
                    }
                    <Divider />
                    <Button variant='outline' mr={4} onClick={onClose} >
                        Cancel
                    </Button>
                    <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="add-listing-form" />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}