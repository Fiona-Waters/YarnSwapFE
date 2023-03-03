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
    IconButton
} from '@chakra-ui/react'
import { AddUsernameForm } from '../../atoms/addUsernameForm';
import { PrimaryButton } from '../../atoms/primaryButton';

export function ProfileTable(props) {
    const { currentUser } = props;
    let userSignUpThrough = currentUser.providerData[0].providerId
    if (userSignUpThrough == 'password') {
        userSignUpThrough = `Email - ${currentUser.email}`
    }
    const userImage = currentUser.photoURL;

    // TODO analytics to calculate listings added to date, ongoing swaps, completed swaps, maybe member since?
    // TODO delete/archive account button - user popover or modal


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
                                ? <Image src={userImage} alt='user image' />
                                : <></>
                            }
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Username</Td>
                        <Td>
                            <AddUsernameForm currentUser={currentUser} />
                        </Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Signed up via</Td>
                        <Td>{userSignUpThrough}</Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Current Token Total</Td>
                        <Td>5</Td>
                        <Td></Td>

                    </Tr>
                    <Tr>
                        <Td>Listings Added to Date</Td>
                        <Td>4</Td>
                        <Td></Td>

                    </Tr>
                    <Tr>
                        <Td>Ongoing Swaps</Td>
                        <Td>3</Td>
                        <Td></Td>

                    </Tr>
                    <Tr>
                        <Td>Completed Swaps</Td>
                        <Td>2</Td>
                        <Td></Td>

                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td>
                            <PrimaryButton label='Delete Account' />
                        </Td>
                        <Td></Td>

                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}