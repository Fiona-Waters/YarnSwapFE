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
import { addListing, addUser, getListings, getUserProfile } from '../../../api/yarn-swap-api';
import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react'

export function ProfileTable(props) {
    const { currentUser, navigateOnSave } = props;

    let userSignUpThrough = currentUser?.providerData[0]?.providerId
    if (userSignUpThrough == 'password') {
        userSignUpThrough = `Email - ${currentUser.email}`
    }
    const userImage = currentUser.photoURL;

    const { data: userProfile, isLoading, refetch } = useQuery('getUserProfile', getUserProfile)
    const { data: listings } = useQuery('listings', getListings)

    const toast = useToast();
    let isNewUser;
    if (!userProfile?.userName) {
        isNewUser = true;
    }
    let isUserArchived;
    if (userProfile?.accountStatus == "Archived") {
        isUserArchived = true;
    }

    async function archiveAccount() {
        const thisUser = userProfile
        thisUser.id = currentUser.uid
        thisUser.accountStatus = "Archived"
        await addUser(thisUser)
        refetch()
        toast({
            title: 'Account Deleted.',
            description: "Your account and listings have been archived and will be deleted along with your listings in 30 days.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

    }

    async function restoreAccount() {
        const thisUser = userProfile
        thisUser.id = currentUser.uid
        thisUser.accountStatus = "Active"
        await addUser(thisUser)
        refetch()
        toast({
            title: 'Account Restored.',
            description: "Your account and listings have been restored",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }


    return (
        <TableContainer border='2px' borderColor='brand.blue' p='20px'>
            <Table size='lg' variant='striped' >
                <Thead>
                    <Tr>
                        <Th fontSize={'lg'}>User Details</Th>
                        <Th></Th>
                        <Th>
                            {userImage &&
                                <Image src={userImage} alt='profile pic' />
                            }
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Name</Td>
                        <Td>{currentUser.displayName}
                        </Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Username</Td>
                        {isNewUser
                            ? <Td>
                                <AddUsernameForm currentUser={currentUser} navigateOnSave={navigateOnSave} />
                            </Td>
                            : <Td>{userProfile?.userName}</Td>
                        }
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Signed up via</Td>
                        <Td>{userSignUpThrough}</Td>
                        <Td></Td>
                    </Tr>
                    {!isNewUser &&
                        <>
                            <Tr>
                                <Td>Tokens</Td>
                                <Td>{userProfile?.remainingTokens}</Td>
                                <Td></Td>
                            </Tr>
                            <Tr>
                                <Td>Swaps</Td>
                                <Td> {userProfile?.amtSwapsCompleted}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Account Status</Td>
                                <Td>{userProfile?.accountStatus}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td></Td>
                                {!isUserArchived
                                    ? <Td>
                                        <PrimaryButton label='Delete Account' onClick={archiveAccount} />
                                    </Td>
                                    : <Td>
                                        <PrimaryButton label='Restore Account' onClick={restoreAccount} />

                                    </Td>
                                }
                                <Td></Td>
                            </Tr>
                        </>
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}