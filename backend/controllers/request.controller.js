import FriendRequest from "../models/requests.model.js";
import User from "../models/user.model.js";
export const receiveRequests = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const receivedRequestIds = user.requestsRecieved;

 
    const requests = await FriendRequest.find({
      _id: { $in: receivedRequestIds },
    }).populate('sender', '_id fullName username');


    if (requests.length === 0) {
      return res.status(200).json({ requests,message: "No requests found"});
    }

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching received requests", error);
    res.status(500).json({ message: "Error fetching received requests" });
  }
};

export const sendRequest = async (req, res) => {
  const { receiverId, senderId } = req.body;

  try {
    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(400).json({ message: "Receiver does not exist" });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(400).json({ message: "Sender does not exist" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: "pending" },
        { sender: receiverId, receiver: senderId, status: "pending" }
      ]
    });

    const areFriends = await User.findOne({
      _id: senderId,
      friends: receiverId,
    });
    

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent or exists" });
    }
    if (areFriends) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const newRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await newRequest.save();

    await User.findByIdAndUpdate(senderId, { $push: { requestsSent: newRequest._id } });
    await User.findByIdAndUpdate(receiverId, { $push: { requestsRecieved: newRequest._id } });

    res.status(200).json({ success: true, message: "Friend request sent successfully" });

  } catch (error) {
    console.error("Error sending friend request", error);
    res.status(500).json({ success: false, message: "Error sending friend request" });
  }
};


// Accept Friend Request
export const acceptRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(400).json({ message: "Request not found" });

    request.status = "accepted";
    await request.save();
    
    await User.findByIdAndUpdate(request.sender, { $push: { friends: request.receiver } });
    await User.findByIdAndUpdate(request.receiver, { $push: { friends: request.sender } });
    console.log(User.findById(request.sender));
    await User.findByIdAndUpdate(request.sender, { $pull: { requestsSent: requestId } });
    await User.findByIdAndUpdate(request.receiver, { $pull: { requestsRecieved: requestId } });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting request" });
  }
};

// Reject Friend Request
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user._id;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(400).json({ message: "Request not found" });
    if (request.receiver.toString() !== userId) return res.status(400).json({ message: "You are not the receiver" });

    request.status = "rejected";
    await request.save();

    await User.findByIdAndUpdate(request.sender, { $pull: { requestsSent: requestId } });
    await User.findByIdAndUpdate(userId, { $pull: { requestsRecieved: requestId } });

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting request" });
  }
};
