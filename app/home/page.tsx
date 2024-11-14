import { isLoggedIn } from "../lib/data";
import { getUser } from "../lib/data"; // Assuming getUser is exported correctly
import { UserIcon, AcademicCapIcon, LightBulbIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  const data = await isLoggedIn();

  // Fetch user details using getUser function
  let user = null;
  if (data && data.sessionData) {
    user = await getUser(data.sessionData.username, data.sessionData.usertype);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 transform transition-all duration-500 hover:shadow-2xl">
        {user ? (
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <UserIcon className="h-6 w-6 text-blue-600" />
              Welcome, {user.first_name} {user.last_name}!
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              Here's more about your profile. You are part of our amazing community of learners and instructors. Let's dive in!
            </p>

            <div className="space-y-6">
              {/* Profile Info Section */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-blue-500" />
                  Your Details
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Username:</span> {user.username}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Field of Study:</span> {user.field_of_study || "Not provided"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Major:</span> {user.major || "Not provided"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Skills to Learn:</span> {user.skills_to_learn || "No skills listed"}
                </p>
              </div>

              {/* Graduate-Specific Section */}
              {user.usertype === "graduate" && (
                <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                    Career Goals
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Skills you want to learn:</span> {user.skills_to_learn || "No skills listed"}
                  </p>
                </div>
              )}

              {/* Instructor-Specific Section */}
              {user.usertype === "instructor" && (
                <div className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5 text-yellow-500" />
                    Instructor Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Expertise:</span> {user.expertise || "No expertise listed"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Field of Study:</span> {user.field_of_study || "Not provided"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-md text-gray-500">
                We’re excited to have you as part of our community. Let’s continue learning and growing together!
              </p>
              <div className="mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg font-medium text-red-600">User not logged in or data not found.</p>
        )}
      </div>
    </div>
  );
}
