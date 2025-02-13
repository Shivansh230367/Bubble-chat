import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null); // Add error state for better error handling

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const chatUser = localStorage.getItem("chat-user");
        const userId = chatUser ? JSON.parse(chatUser)._id : null;

        if (!userId) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        console.log("getConversations", userId);
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
		  body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
        setError(error.message); // Save error message in state for further use
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []); // Empty dependency array to run only once on mount

  return { loading, conversations, error };
};

export default useGetConversations;
