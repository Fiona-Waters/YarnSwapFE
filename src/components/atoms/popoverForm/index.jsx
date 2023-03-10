import { ButtonGroup, FormControl, Input, Stack } from '@chakra-ui/react'
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getUserProfile } from '../../../api/yarn-swap-api';
import { PrimaryButton } from '../primaryButton'

export function DeclinePopoverForm(props) {

    const { data: user } = useQuery('getUserProfile', getUserProfile)
    const userMemo = useMemo(() => {
        return user;
    }, [user])
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: user });
    
    async function onSubmit(values) {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="decline-listing-form">
            <FormControl isRequired={true} p='20px' border='4px' borderColor={'brand.blue'}>
                <Stack spacing={4}>
                    <Input size='lg' id='declineReason' type='text' placeholder='Decline reason' {...register('listingNote', {
                        required: 'This is required',
                        minLength: { value: 10, message: 'Minimum length is 10 characters' },
                    })} />
                    <ButtonGroup display='flex' justifyContent='flex-end'>
                        <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="decline-listing-form" />
                    </ButtonGroup>
                </Stack>
            </FormControl>
        </form>

    )
}