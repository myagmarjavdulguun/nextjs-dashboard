import {
  getAcceptedInstructors,
  getAcceptedGraduates,
  getMessages,
  getUser,
  isLoggedIn,
} from "@/app/lib/data";
import MessageForm from "@/app/ui/create-message";
import Messages from "@/app/ui/messages";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    instructor?: string;
    graduate?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const data = await isLoggedIn();
  const userType = data?.sessionData.usertype;

  if (!data?.sessionData) {
    redirect("/login"); // Redirect if not logged in
  }

  // Fetch logged-in user details
  const user = await getUser(data?.sessionData.username, userType);

  let usersList: any[] = [];
  let selectedUserName = null;
  let messages = [];

  if (userType === "graduate") {
    // Graduate: Show instructors
    usersList = await getAcceptedInstructors(data?.sessionData.username);

    // Redirect if no instructor selected
    if (!searchParams?.instructor && usersList.length > 0) {
      redirect("?instructor=" + usersList[0].instructor_id);
    }

    // Fetch messages for graduate with selected instructor
    messages = await getMessages(
      user?.graduate_id,
      searchParams?.instructor || usersList[0]?.instructor_id
    );

    // Find selected instructor's name
    const selectedInstructor = usersList.find(
      (instructor) => instructor.instructor_id === searchParams?.instructor
    );
    selectedUserName = selectedInstructor
      ? `${selectedInstructor.first_name} ${selectedInstructor.last_name}`
      : null;
  } else if (userType === "instructor") {
    // Instructor: Show graduates
    usersList = await getAcceptedGraduates(data?.sessionData.username);

    // Redirect if no graduate selected
    if (!searchParams?.graduate && usersList.length > 0) {
      redirect("?graduate=" + usersList[0].graduate_id);
    }

    // Fetch messages for instructor with selected graduate
    messages = await getMessages(
      searchParams?.graduate || usersList[0]?.graduate_id,
      user?.instructor_id
    );

    // Find selected graduate's name
    const selectedGraduate = usersList.find(
      (graduate) => graduate.graduate_id === searchParams?.graduate
    );
    selectedUserName = selectedGraduate
      ? `${selectedGraduate.first_name} ${selectedGraduate.last_name}`
      : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-pink-200 p-6 flex">
      {/* Left Sidebar - Users List */}
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg mr-6 flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <ChatBubbleLeftIcon className="h-6 w-6 text-purple-600" />
          {userType === "graduate" ? "Instructors" : "Graduates"}
        </h1>

        <div className="overflow-y-auto flex-1 space-y-4 max-h-lvh">
          {usersList.map((user) => (
            <Link
              key={user.id}
              href={
                userType === "graduate"
                  ? "?instructor=" + user.instructor_id
                  : "?graduate=" + user.graduate_id
              }
            >
              <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all">
                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">
                    {user.first_name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-md font-medium text-gray-800">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col">
        {/* Messages Component */}
        <div className="flex-grow">
          <Messages
            name={selectedUserName || ""}
            graduate_id={
              userType === "graduate"
                ? user?.graduate_id
                : searchParams?.graduate
            }
            instructor_id={
              userType === "graduate"
                ? searchParams?.instructor
                : user?.instructor_id
            }
            sender={userType}
          />
        </div>

        {/* Message Form */}
        <div className="mt-auto">
          <MessageForm
            graduate_id={
              userType === "graduate"
                ? user?.graduate_id
                : searchParams?.graduate
            }
            instructor_id={
              userType === "graduate"
                ? searchParams?.instructor
                : user?.instructor_id
            }
            sender={userType}
          />
        </div>
      </div>
    </div>
  );
}
