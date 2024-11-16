import { getMessages } from "../lib/data";

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
    const messages = await getMessages(graduate_id, instructor_id);

    return (
      <div className="flex-1 overflow-y-auto space-y-4 max-h-full">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
          {name}
        </h1>
      
        {/* Scrollable Messages */}
        <div className="overflow-y-auto max-h-[440px] space-y-4 pr-2 flex flex-col-reverse">
          <div>
          {messages.map((message, index) => (
            <div key={index}>
              <div className={'flex ' + (message.sender === sender ? 'justify-end' : 'justify-start')}>
              <div
                className={
                  'rounded-xl p-3 m-1 max-w-xs ' +
                  (message.sender === sender ? 'bg-blue-200' : 'bg-gray-200') +
                  ' break-words' // Add this class to wrap text
                }
              >
                  <p className="text-sm text-gray-700">{message.message_content}</p>
                </div>
              </div>
              {/* Optional timestamp or additional details */}
              {/* <div className="flex justify-start">
                <p className="text-xs text-gray-500 ml-12">3 hours ago</p>
              </div> */}
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  }