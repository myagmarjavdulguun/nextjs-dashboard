import { getMessages } from "../lib/data";
import MessagesClient from "./chats";

export default async function Messages({
  name,
  instructor_id,
  graduate_id,
  sender,
}: {
  name: string;
  instructor_id: string;
  graduate_id: string;
  sender: string;
}) {
  const initialMessages = await getMessages(graduate_id, instructor_id);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 max-h-full">
      <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
        {name}
      </h1>
      <MessagesClient
        initialMessages={initialMessages}
        graduate_id={graduate_id}
        instructor_id={instructor_id}
        sender={sender}
      />
    </div>
  );
}
