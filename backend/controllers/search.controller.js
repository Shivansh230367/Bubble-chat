import User from "../models/user.model.js";

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.query; // Get the search query from the request

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Use MongoDB's $or operator to search for users by name or email (case-insensitive)
    const searchResults = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, 
      ],
    }).select("_id fullName username"); // Select fields to return in the result

    res.status(200).json({
      success: true,
      results: searchResults,   
    });
  } catch (error) {
    console.error("Error in searchUsers controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default searchUsers;