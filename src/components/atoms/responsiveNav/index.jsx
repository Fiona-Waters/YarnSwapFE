import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import {Link as RLink} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getUserProfile } from '../../../api/yarn-swap-api';
import { useQuery } from "react-query";


const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="#5b95ba"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    fill="#5b95ba"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", as, ...rest }) => {
  return (
    <RLink to={to} >
      <Text display="block" {...rest}>
        {children}
      </Text>
    </RLink>
  );
};

const MenuLinks = ({ isOpen }) => {
  const { data: userProfile } = useQuery('getUserProfile', getUserProfile)
  var isAdminUser = Boolean(userProfile?.role == "admin");

  const location = useLocation()
  const page = location.pathname;

  return (
    <Box w={'full'} align={'center'}
       display={{ base: isOpen ? "block" : "none", md: "block" }}
       flexBasis={{ base: "100%", md: "auto" }}
      
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "center"]}
        direction={["column", "column", "column", "row"]}
        pt={[4, 4, 0, 0]}
        fontSize={'xl'}
      >
        <MenuItem  to="/dashboard" isCurrentPage={page === '/dashboard'} fontWeight={page === '/dashboard' ? 'bold' : 'normal'} color={page === '/dashboard' ? 'brand.navBlue' : 'normal'}>Dashboard</MenuItem>
        <MenuItem  to="/listings" isCurrentPage={page === '/listings'} fontWeight={page === '/listings' ? 'bold' : 'normal'} color={page === '/listings' ? 'brand.navBlue' : 'normal'}>Listings </MenuItem>
        <MenuItem  to="/swaps" isCurrentPage={page === '/swaps'} fontWeight={page === '/swaps' ? 'bold' : 'normal'} color={page === '/swaps' ? 'brand.navBlue' : 'normal'}>Swaps </MenuItem>
        <MenuItem  to="/wishlist" isCurrentPage={page === '/wishlist'} fontWeight={page === '/wishlist' ? 'bold' : 'normal'} color={page === '/wishlist' ? 'brand.navBlue' : 'normal'}>Wishlist </MenuItem>
        <MenuItem  to="/about" isCurrentPage={page === '/about'} fontWeight={page === '/about' ? 'bold' : 'normal'} color={page === '/about' ? 'brand.navBlue' : 'normal'}>About </MenuItem>
        <MenuItem  to="/myprofile" isCurrentPage={page === '/myprofile'} fontWeight={page === '/myprofile' ? 'bold' : 'normal'} color={page === '/myprofile' ? 'brand.navBlue' : 'normal'}>My Profile </MenuItem>
       {isAdminUser &&
        <MenuItem  to="/admin" isLast isCurrentPage={page === '/admin'} fontWeight={page === '/admin' ? 'bold' : 'normal'} color={page === '/admin' ? 'brand.navBlue' : 'normal'}>Admin</MenuItem>
       }
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["normal", "normal", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;