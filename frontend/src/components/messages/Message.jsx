import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import "./Message.css";


const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const isFromUser = message.senderId === authUser._id;
	const time = extractTime(message.createdAt);
	const alignmentClass = isFromUser ? "message-end" : "message-start";
	const profileImage = isFromUser ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleColorClass = isFromUser ? "bg-primary" : "bg-secondary";

	const animationClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`${alignmentClass}`}>
			<div className='message-avatar'>
				<img alt='Profile' src={profileImage} className="avatar-image" />
			</div>
			<div className={`message-bubble ${bubbleColorClass} ${animationClass}`}>
				{message.message}
			</div>
			<div className='message-footer'>
				{time}
			</div>
		</div>
	);
};

export default Message;
