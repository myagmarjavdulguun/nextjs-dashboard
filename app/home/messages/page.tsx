import { getAcceptedInstructors, getMessages, getUser, isLoggedIn } from '@/app/lib/data';
import { ChatBubbleLeftIcon, InboxIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Page(props: {
  searchParams?: Promise<{
    instructor?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const data = await isLoggedIn();

  const instructors = await getAcceptedInstructors(data?.sessionData.username);

  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);

  const selectedInstructorId = searchParams?.instructor ?? '';

  const messages = await getMessages(user?.graduate_id, selectedInstructorId);

  const selectedInstructorName = instructors.map((instructor) => {if (instructor.instructor_id == selectedInstructorId) return `${instructor.first_name} ${instructor.last_name}`});
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-pink-200 p-6 flex">
      {/* Left Sidebar - User List */}
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg mr-6 flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <ChatBubbleLeftIcon className="h-6 w-6 text-purple-600" />
          Users
        </h1>

        <div className="overflow-y-auto flex-1 space-y-4 max-h-lvh">
          {instructors.map((instructor) => (
            <Link href={'?instructor=' + instructor.instructor_id}>
              <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all">
                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">{instructor.first_name[0]}</span>
                </div>
                <div>
                  <p className="text-md font-medium text-gray-800">{instructor.first_name} {instructor.last_name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          {selectedInstructorName}
        </h1>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-96">
          {/* Message 1 - Received */}
          {messages.map((message) => (
            <div>
              <div className={'flex ' + (message.sender == data?.sessionData.usertype ? 'justify-end' : 'justify-start')}>
                <div className={"rounded-xl p-4 max-w-xs " + (message.sender == data?.sessionData.usertype ? 'bg-blue-200' : 'bg-gray-200')}>
                  <p className="text-sm text-gray-700">{message.message_content}</p>
                </div>
              </div>
              {/*<div className="flex justify-start">
                <p className="text-xs text-gray-500 ml-12">3 hours ago</p>
              </div>*/}
            </div>
          ))}
        </div>

        {/* Send Message Input */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
            <ChatBubbleLeftIcon className="h-5 w-5 text-green-500" />
            Send a New Message
          </h2>

          <div className="space-y-4">
            {/* Recipient Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient</label>
              <input
                type="text"
                placeholder="Enter recipient's username"
                className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Send Button */}
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
