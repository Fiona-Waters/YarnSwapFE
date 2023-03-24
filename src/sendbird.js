import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

export default async function createSendbirdChannel(currentUser, swap) {
    const sb = SendbirdChat.init({
        appId: "30065601-9ED0-439D-B3BA-00FA76024F4F",
        modules: [
            new GroupChannelModule(),
        ],
    });
    try {
        const user = await sb.connect(currentUser);
    } catch (err) {
        console.log("error connecting to sendbird", err)
    }

    const params = {
        invitedUserIds: [swap.swappeeUserId, swap.swapperUserId],
        name: swap.swapName,
        // TODO cover_url could be link to image used in listing
    }
    const newChannel = await sb.groupChannel.createChannel(params);
    return newChannel
} 