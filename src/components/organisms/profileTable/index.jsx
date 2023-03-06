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

    // TODO analytics to calculate listings added to date, ongoing swaps, completed swaps, 
    // maybe member since?
    // TODO after 30 days delete user account and listings
    // when account is archived set tokens to 0, when restored set it to 
    // number of swappable and active listings
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
        listings?.map(async (listing) => {
            if (listing.userId == currentUser.uid) {
                listing.status = "Archived"
            }
            await addListing(listing)
        })
        refetch()
        toast({
            title: 'Account Deleted.',
            description: "Your account has been archived and will be deleted along with your listings in 30 days.",
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
        listings?.map(async (listing) => {
            if (listing.userId == currentUser.uid) {
                listing.status = "Active"
            }
            await addListing(listing)
        })
        refetch()
        toast({
            title: 'Account Restored.',
            description: "Your account has been restored",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
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
                                <Td>{userProfile?.remainingTokens}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Listings Added to Date</Td>
                                <Td>{userProfile?.amtListingsAdded}</Td>
                                <Td></Td>

                            </Tr>
                            <Tr>
                                <Td>Completed Swaps</Td>
                                <Td>{userProfile?.amtSwapsCompleted}</Td>
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