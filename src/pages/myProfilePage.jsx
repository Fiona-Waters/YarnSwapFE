import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import MyProfileTemplate from "../components/templates/profileTemplate";

const MyProfilePage = () => {
    const auth = getAuth();

    const [user] = useAuthState(auth)

    return (
        <MyProfileTemplate currentUser={user} />
    );
};

export default MyProfilePage;