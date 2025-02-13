import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchRequests from "../../hooks/useGetRequests";
import useAcceptRejectRequest from "../../hooks/useAcceptRejectRequest";
import "./Requests.css";

const Requests = () => {
  const { receivedRequests, loading, error } = useFetchRequests();
  const { acceptRequest, rejectRequest, loadingN, errorN } = useAcceptRejectRequest();

  const handleAccept = (requestId) => {
    acceptRequest(requestId);
    
  };

  const handleReject = (requestId) => {
    rejectRequest(requestId);
  };

  return (
    <div className="requests-container">
      <div className="home-link-container">
        <Link to="/" className="home-link">Home</Link>
      </div>

      <h1>Friend Requests</h1>
      {loading && <p>Loading requests...</p>}
      {error && <p>Error fetching requests: {error}</p>}
      {receivedRequests.length > 0 ? (
        receivedRequests.map((request) => (
          <div key={request._id} className="request-card">
            <div className="request-info">
              <p className="name">{request.sender?.fullName || "Unknown Sender"}</p>
              <p className="email">{request.sender?.username || "No username available"}</p>
            </div>
            <div className="buttons">
              <button onClick={() => handleAccept(request._id)} className="accept-btn">
                Accept
              </button>
              <button onClick={() => handleReject(request._id)} className="reject-btn">
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No friend requests received</p>
      )}
    </div>
  );
};

export default Requests;
