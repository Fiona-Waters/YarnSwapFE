import {
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    IconButton,
} from '@chakra-ui/react'
import { AddUsernameForm } from '../../atoms/addUsernameForm';
import { PrimaryButton } from '../../atoms/primaryButton';
import { addUser, getUserProfile } from '../../../api/yarn-swap-api';
import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


export function ProfileTable(props) {
    const { currentUser, navigateOnSave } = props;

    let userSignUpThrough = currentUser?.providerData[0]?.providerId
    if (userSignUpThrough == 'password') {
        userSignUpThrough = `Email - ${currentUser.email}`
    }
    const userImage = currentUser.photoURL;

    const { data, isLoading } = useQuery('getUserProfile', getUserProfile)

    // TODO analytics to calculate listings added to date, ongoing swaps, completed swaps, maybe member since?
    // TODO delete/archive account button 
    const toast = useToast();
    const navigate = useNavigate();
    let isNewUser;
    if (!data?.userName) {
        isNewUser = true;
    }
    console.log(currentUser)
    async function archiveAccount() {
        user.id = currentUser.uid
        user.accountStatus = "Archived"
        await addUser(user)
        toast({
            title: 'Account Deleted.',
            description: "Your account has been archived and will be deleted along with your listings in 30 days.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        navigate("/dashboard")
        //        onClose()
    }

    return (
        <TableContainer border='2px' borderColor='brand.blue' p='10px'>
            <Table size='lg' variant='striped' >
                <Thead>
                    <Tr>
                        <Th>My Profile</Th>
                        <Th>{currentUser.displayName}
                        </Th>
                        <Th>
                            {userImage
                                ? <Image src={userImage} alt='profile pic' />
                                : <></>
                            }
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Username</Td>
                        <Td>
                            <AddUsernameForm currentUser={currentUser} navigateOnSave={navigateOnSave} />
                        </Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Signed up via</Td>
                        <Td>{userSignUpThrough}</Td>
                        <Td></Td>
                    </Tr>
                    {isNewUser
                        ? <></>
                        : <>
                            <Tr>
                                <Td>Current Token Total</Td>
                                <Td>{data?.remainingTokens}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Listings Added to Date</Td>
                                <Td>{data?.amtListingsAdded}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Completed Swaps</Td>
                                <Td>{data?.amtSwapsCompleted}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Account Status</Td>
                                <Td>{data?.accountStatus}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td></Td>
                                <Td>
                                    <PrimaryButton label='Delete Account' onClick={archiveAccount} />
                                </Td>
                                <Td></Td>
                            </Tr>
                        </>
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}