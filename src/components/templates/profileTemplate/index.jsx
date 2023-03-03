import { ProfileTable } from "../../organisms/profileTable";


export function MyProfileTemplate(props) {
    const { currentUser } = props;
    return (
        <ProfileTable currentUser={currentUser} />
    )
}