import { Flex, Spacer } from '@chakra-ui/react';
import {Outlet, Link} from 'react-router-dom';


function MainLayout() {
    return (
        <Flex h="100vh" direction="column">
            <div>MY NAV BAR</div>
            <ul>
            <li><Link to={'/'}>Home</Link> </li>
                <li><Link to={'about'}>About</Link> </li>
                <li><Link to={'listings'}>listing</Link> </li>
            </ul>
            <Flex pl={32} pr={32}>
                
                
                <Outlet />
                
            </Flex>
        </Flex>
    )
}

export default MainLayout; 