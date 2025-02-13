import { useState, useEffect } from "react";

const useGetReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      setLoading(true);
      const chatUser = localStorage.getItem("chat-user");
      const userId = chatUser ? JSON.parse(chatUser)._id : null;

      if (!userId) {
        setError("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/request/recieve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch received requests");
        }

        const data = await res.json();
        if (Array.isArray(data.requests)) {
          setReceivedRequests(data.requests);
        } else {
          setError("Invalid response format: 'requests' is not an array.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedRequests();
  }, [receivedRequests]);

  return { receivedRequests, loading, error };
};

export default useGetReceivedRequests;
