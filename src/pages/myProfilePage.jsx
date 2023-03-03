import { getAuth } from "firebase/auth";
import { MyProfileTemplate } from "../components/templates/profileTemplate";

const MyProfilePage = () => {


    const auth = getAuth()


    return (
        <MyProfileTemplate currentUser={auth.currentUser} />
    );
};

export default MyProfilePage;