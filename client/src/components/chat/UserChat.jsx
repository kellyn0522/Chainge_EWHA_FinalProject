import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import account from "../../icons/account.svg";
import account_box from "../../icons/account_box.svg";
import person from "../../icons/person.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import "../../index.css"
//import moment from "moment";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);
    //const lastMessageTime = chat.lastMessageTime ? moment(chat.lastMessageTime).calendar() : "N/A";

    return (<>
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between"
            role="button">
            <div className="d-flex align-items-center">
                <div className="me-2">
                    <img src={account} height="35px" />
                </div>
                <div className="text-content">
                    <div className="name">
                        {recipientUser?.nickName}
                    </div>
                    <div className="text">
                        Text Message
                    </div>
                </div>

            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">
                12/12/2022
                </div>
                <div className="this-user-notifications">
                    2
                </div>

                <span className={isOnline ? "user-online" : ""}> </span>
            </div>

        </Stack>
    </>);
};

export default UserChat;