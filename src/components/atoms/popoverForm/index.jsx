import { ButtonGroup, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import PrimaryButton from '../primaryButton'

export default function DeclinePopoverForm(props) {
    const { onSubmit, fieldname } = props; 

    
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
   
    return (
        <form onSubmit={handleSubmit(onSubmit)} id="decline-listing-form">
            <FormControl isRequired={true} p='20px' border='4px' borderColor={'brand.blue'} isInvalid={!!errors.brand}>
                <Stack spacing={4}>
                    <Input size='lg'  type='text' placeholder='Decline reason' {...register(fieldname, {
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