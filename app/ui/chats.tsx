'use client';

import { useEffect, useState } from "react";

export default function MessagesClient({
  initialMessages,
  graduate_id,
  instructor_id,
  sender,
}: {
  initialMessages: any[];
  graduate_id: string;
  instructor_id: string;
  sender: string;
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?graduate_id=${graduate_id}&instructor_id=${instructor_id}`, {
          cache: "no-store", // Ensures no caching, so you always get fresh data
        });

        if (res.ok) {
          const data = await res.json();
          setMessages(data); // Update state with new messages
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const interval = setInterval(fetchMessages, 2000); // Fetch new messages every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [graduate_id, instructor_id]);

  return (
    <div className="overflow-y-auto max-h-[440px] space-y-4 pr-2 flex flex-col-reverse">
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <div className={'flex ' + (message.sender === sender ? 'justify-end' : 'justify-start')}>
                        <div
                        className={
                            'rounded-xl p-3 m-1 max-w-xs ' +
                            (message.sender === sender ? 'bg-blue-200' : 'bg-gray-200') +
                            ' break-words'
                        }
                        >
                            <p className="text-sm text-gray-700">{message.message_content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
