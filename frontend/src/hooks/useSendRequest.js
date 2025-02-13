const useSendRequest = () => {
    const sendRequest = async ({ receiverId }) => {
    const chatUser = localStorage.getItem("chat-user");
    const senderId = chatUser ? JSON.parse(chatUser)._id : null;
  
      if (!senderId) {
        alert("You are not logged in. Please log in.");
        return;
      }
  
      try {
        const res = await fetch("/api/request/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderId, receiverId }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          if (data.success) {
            alert(`Request sent to ${receiverId}`);
          } else {
            alert(`Failed to send request: ${data.error || "Unknown error"}`);
          }
        } else {
          alert(`Error: ${data.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error sending request:", error);
        alert(`Error sending request: ${error.message || "Unknown error"}`);
      }
    };
  
    return { sendRequest };
  };
  
  export default useSendRequest;
  