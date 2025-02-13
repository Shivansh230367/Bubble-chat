import { useEffect, useRef, useCallback } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading, setPage, hasMore } = useGetMessages();
  useListenMessages();
  const observer = useRef();
  const lastMessageRef = useRef();

  const lastMessageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  if (!Array.isArray(messages)) {
    return <div>Error: Messages should be an array.</div>;
  }

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.map((message, index) => {
        if (messages.length === index + 1) {
          return (
            <div key={message._id} ref={lastMessageElementRef}>
              <Message message={message} />
            </div>
          );
        } else {
          return (
            <div key={message._id}>
              <Message message={message} />
            </div>
          );
        }
      })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;