import Conversations from "./Conversations";

import "./Sidebar.css";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className="sidebar">
			
			<div className="divider px-3"></div>
			<Conversations />
			
		</div>
	);
};
export default Sidebar;
