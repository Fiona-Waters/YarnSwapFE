import { ButtonGroup, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react'
import { list } from 'firebase/storage';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { addListing, getUserProfile } from '../../../api/yarn-swap-api';
import { PrimaryButton } from '../primaryButton'

export function DeclinePopoverForm(props) {
    const { listing, onClose, refreshListings } = props; 

    const { data: user } = useQuery('getUserProfile', getUserProfile)
    const userMemo = useMemo(() => {
        return user;
    }, [user])
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: user });
    
    async function onSubmit(values) {
        listing.status = "Declined"
        listing.listingNote =values?.listingNote
        console.log(values)
        console.log("listing", listing)
        await addListing(listing)
        onClose()
        refreshListings()
        //TODO not refreshing listings
        // whatever the admin users enters in decline form
        // change listing status to declined and provide a reason (badge on listing card?)
        // add flag to listing in users dashboard
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="decline-listing-form">
            <FormControl isRequired={true} p='20px' border='4px' borderColor={'brand.blue'} isInvalid={!!errors.brand}>
                <Stack spacing={4}>
                    <Input size='lg' id='listingNote' type='text' placeholder='Decline reason' {...register('listingNote', {
                        required: 'This is required',
                        minLength: { value: 10, message: 'Minimum length is 10 characters' },
                    })} />
                    <ButtonGroup display='flex' justifyContent='flex-end'>
                        <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="decline-listing-form" />
                    </ButtonGroup>
                </Stack>
                <FormErrorMessage>{errors.listingNote?.message}</FormErrorMessage>
            </FormControl>
        </form>

    )
}