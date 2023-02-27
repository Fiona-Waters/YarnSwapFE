import { getAuth } from "firebase/auth";
import Channel from '@sendbird/uikit-react/Channel'
import '@sendbird/uikit-react/dist/index.css';
import { SendBirdProvider } from "@sendbird/uikit-react";
import { useLocation } from "react-router-dom";



export function MySendbirdApp() {
const auth = getAuth()
const {state} = useLocation();
const {chatUrl} = state
const currentUser = auth?.currentUser?.uid
const name = auth?.currentUser.displayName

    if(!currentUser) {
        return <></>
    }
    return (
        <SendBirdProvider appId={"30065601-9ED0-439D-B3BA-00FA76024F4F"}
        userId={currentUser}
        nickname={name}>
        <div className="SendbirdApp" style={{height:'500px'}}>
            <Channel channelUrl={chatUrl}/>
        </div>
        </SendBirdProvider>
    )
}