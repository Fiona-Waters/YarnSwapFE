import { FormControl, Input } from '@chakra-ui/react'
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { addUser, getUser } from '../../../api/yarn-swap-api';
import { PrimaryButton } from '../primaryButton'

export function AddUsernameForm(props) {
    const { data: user } = useQuery('getUser', getUser)
    const userMemo = useMemo(() => {
        console.log("hello! use memo", user)
        return user;
    }, [user])
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({defaultValues: user});
    console.log("data", user)
    useEffect(() => {
        console.log("well")
        if(user) {
            reset(user)
        }
    },[user])


    const { currentUser } = props;
    async function onSubmit(values) {
        console.log("values", values)
        values.ID = currentUser.uid;
        values.remainingTokens = 0;
        await addUser(values)
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
