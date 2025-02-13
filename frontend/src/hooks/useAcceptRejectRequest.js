import { useState } from "react";

const useAcceptRejectRequest = () => {
  const [loadingN, setLoading] = useState(false);
  const [errorN, setError] = useState(null);

  const acceptRequest = async (requestId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/request/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        throw new Error(data.message || "Failed to accept request");
      }
    } catch (err) {
      setError(err.message);
      alert("Error accepting request: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/request/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        throw new Error(data.message || "Failed to reject request");
      }
    } catch (err) {
      setError(err.message);
      alert("Error rejecting request: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { acceptRequest, rejectRequest, loadingN, errorN };
};

export default useAcceptRejectRequest;
