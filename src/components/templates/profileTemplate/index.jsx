import { ProfileTable } from "../../organisms/profileTable";


export function MyProfileTemplate(props) {
    const { currentUser, navigateOnSave } = props;
    return (
        <ProfileTable currentUser={currentUser} navigateOnSave={navigateOnSave} />
    )
}