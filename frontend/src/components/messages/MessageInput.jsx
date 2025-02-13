import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form style={{ padding: '0 16px', margin: '12px 0' }} onSubmit={handleSubmit}>
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          type='text'
          style={{
            border: '1px solid #4b5563',
            fontSize: '14px',
            borderRadius: '8px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#374151',
            color: '#fff',
          }}
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' style={{ position: 'absolute', top: '0', right: '0', height: '115%', display: 'flex', alignItems: 'center', paddingRight: '32px', border: 'none', background: 'none', cursor: 'pointer' }}>
          {loading ? <div style={{ border: '2px solid #fff', borderRadius: '50%', width: '16px', height: '16px', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;