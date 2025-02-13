import { create } from "zustand";
const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],  // Initialize as an empty array
  setMessages: (newMessages) => set({ messages: newMessages }),
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  resetConversation: () => set({ selectedConversation: null, messages: [] }) // Reset messages too
}));

export default useConversation;
