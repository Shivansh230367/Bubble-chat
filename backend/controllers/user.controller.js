import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const { userId } = req.body; 

    const user = await User.findById(userId).populate({
      path: 'friends',
      select: '-password'
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getFriends controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};