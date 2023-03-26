// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {StyledFirebaseAuth} from 'react-firebaseui';
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Box, Text, VStack } from "@chakra-ui/react";
import Logo from "./components/atoms/logo";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC8l0cGVMyf-2Y8lyHXtHDFlLCQbjVP_8",
  authDomain: "yarnswap-52dbd.firebaseapp.com",
  databaseURL: "https://yarnswap-52dbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yarnswap-52dbd",
  storageBucket: "yarnswap-52dbd.appspot.com",
  messagingSenderId: "275422197921",
  appId: "1:275422197921:web:553d6c796569ecee6158e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const storage = getStorage(app)



const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    //      FacebookAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID

    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function SignInScreen() {
  return (
    <VStack h='full' w='full' minH='100vh' spacing={12} pt={120}>
      <Box>
        <Logo w={40} h={40} />
      </Box>
      <Box>
        <Text data-cy="choose-provider-text" >Please choose your preferred method below...</Text>
      </Box>
      <Box>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Box>
    </VStack>
  );
}
