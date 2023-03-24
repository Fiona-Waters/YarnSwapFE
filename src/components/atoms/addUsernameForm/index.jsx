import { FormControl, Input, useToast } from '@chakra-ui/react'
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { addUser, getUserProfile } from '../../../api/yarn-swap-api';
import PrimaryButton from '../primaryButton'

export default function AddUsernameForm(props) {
    const toast = useToast()
    const { data: user } = useQuery('getUserProfile', getUserProfile)
    const userMemo = useMemo(() => {
        return user;
    }, [user])
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: user });
    console.log("data", user)
    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user])
    const navigate = useNavigate();
    const { currentUser, navigateOnSave } = props;

    async function onSubmit(values) {
        values.ID = currentUser.uid;
        values.accountStatus = "Active"
        try {
            await addUser(values)
            if (navigateOnSave) {
                navigate(navigateOnSave)
            }
        } catch (e) {
            if (e.message == "Bad Request") {
                console.log("username not unique")
                toast({
                    title: 'Username invalid',
                    position: 'top',
                    description: "This username is not available, please choose another",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            }
            console.log("error adding user", e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="add-username-form">
            <FormControl>
                <Input id='userName' type='text' placeholder='Username' {...register('userName', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Minimum length is 3 characters' },
                })} />
                <PrimaryButton label="Save" isLoading={isSubmitting} type='submit' form="add-username-form" />
            </FormControl>
        </form>

    )
}
