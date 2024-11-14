import { getAcceptedInstructors, getOtherInstructors, getRequestedInstructors, isLoggedIn } from "@/app/lib/data";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PlusIcon,
  HomeIcon,
  ChatBubbleLeftIcon, // Use this for Chat
  XCircleIcon, // Use this for canceling requests
  PaperAirplaneIcon, // Use this for sending requests
} from '@heroicons/react/24/outline';

export default async function Page() {
  const data = await isLoggedIn();
  const username = data ? data.sessionData.username : '';

  const acceptedInstructors = await getAcceptedInstructors(username);
  const requestedInstructors = await getRequestedInstructors(username);
  const otherInstructors = await getOtherInstructors(username);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          <HomeIcon className="inline-block w-6 h-6 text-blue-600 mr-2" />
          Instructors
        </h1>

        {/* Accepted Instructors Section */}
        <section>
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            Accepted Instructors
          </h2>
          <div className="space-y-6">
            {acceptedInstructors.map((instructor) => (
              <div
                key={instructor.username}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">{instructor.first_name} {instructor.last_name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Field of Study: {instructor.field_of_study}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <BriefcaseIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Expertise: {instructor.expertise}
                  </p>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span>Chat</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Requested Instructors Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            Requested Instructors
          </h2>
          <div className="space-y-6">
            {requestedInstructors.map((instructor) => (
              <div
                key={instructor.username}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">{instructor.first_name} {instructor.last_name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Field of Study: {instructor.field_of_study}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <BriefcaseIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Expertise: {instructor.expertise}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <XCircleIcon className="w-5 h-5" />
                  <span>Cancel Request</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Other Instructors Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            All Instructors
          </h2>
          <div className="space-y-6">
            {otherInstructors.map((instructor) => (
              <div
                key={instructor.username}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">{instructor.first_name} {instructor.last_name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Field of Study: {instructor.field_of_study}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <BriefcaseIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                    Expertise: {instructor.expertise}
                  </p>
                </div>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>Send Request</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Optionally add a button to add new instructors */}
        <section className="mt-12 text-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 flex items-center justify-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Add Instructor</span>
          </button>
        </section>
      </div>
    </div>
  );
}
