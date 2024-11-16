'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createChat } from "../lib/actions";

export default function MessageForm({
  graduate_id,
  instructor_id,
  sender,
}: {
  graduate_id: string;
  instructor_id: string;
  sender: string;
}) {
  // State for the message input
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    formData.append('message', message);
    formData.append('graduate_id', graduate_id);
    formData.append('instructor_id', instructor_id);
    formData.append('sender', sender);

    // Call the createChat function
    const result = await createChat({}, formData);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {/* Message Input */}
          <input
            type="text"
            name="message"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)} // Update message state
            placeholder="Write your message here..."
            autoComplete="off"
            className="flex-grow p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="graduate_id"
            value={graduate_id}
            className="hidden"
          />

          <input
            type="text"
            name="instructor_id"
            value={instructor_id}
            className="hidden"
          />

          <input
            type="text"
            name="sender"
            value={sender}
            className="hidden"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </form>
  );
}
