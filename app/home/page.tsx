import { getInstructorTrainings, getGraduateTrainings, isLoggedIn, getGraduateNumber, getInstructorNumber, getTrainingNumber, getActiveTrainingNumber } from "../lib/data";
import { getUser } from "../lib/data"; // Assuming getCurrentTrainings is a function that fetches the user's current trainings
import { UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  const data = await isLoggedIn();

  // Fetch user details using getUser function
  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);

  const numberOfGraduates = await getGraduateNumber();
  const numberOfInstructors = await getInstructorNumber();
  const numberOfTrainings = await getTrainingNumber();
  const numberOfActiveTrainings = await getActiveTrainingNumber();

  // Fetch the current trainings for the user
  const currentTrainings = data?.sessionData.usertype === 'graduate' ? await getGraduateTrainings(user?.graduate_id) : await getInstructorTrainings(user?.instructor_id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      {data?.sessionData.usertype != 'admin' ? (
        <div className="min-h-[500px] max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Current Trainings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Таны сургалтууд</h2>
            <div className="space-y-4">
              {currentTrainings.length > 0 ? (
                currentTrainings.map((training, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-medium text-gray-800 mb-4">{training.title}</h3>
                    <p className="text-sm text-gray-600">
                      Багш: {training.first_name + ' ' + training.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Эхлэх огноо:</span> {new Date(training.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Дуусах огноо:</span> {new Date(training.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Байршил:</span> {training.location}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">Сургалт олдсонгүй.</p>
              )}
            </div>
          </div>
  
          {/* Right Column - User Data */}
          <div className="space-y-6">
            {user ? (
              <div>
                <h1 className="text-4xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                  Сайн уу, {user.first_name} {user.last_name}!
                </h1>
  
                <div className="space-y-6">
                  {/* Graduate-Specific Section */}
                  {user.user_type === "graduate" && (
                    <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-blue-500" />
                        Таны мэдээлэл
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Таны нэр:</span> {user.first_name + ' ' + user.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Нэвтрэх нэр:</span> {user.username}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Мэргэжлийн салбар:</span> {user.field_of_study || "Баталгаажуулаагүй"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Мэргэжлийн чиглэл:</span> {user.major || "Баталгаажуулаагүй"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Сурах ур чадвар:</span> {user.skills_to_learn || "Талбар оруулаагүй"}
                      </p>
                    </div>
                  )}
  
                  {/* Instructor-Specific Section */}
                  {user.user_type === "instructor" && (
                    <div className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <BriefcaseIcon className="h-5 w-5 text-yellow-500" />
                        Таны мэдээлэл
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Таны нэр:</span> {user.first_name + ' ' + user.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Нэвтрэх нэр:</span> {user.username}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Мэргэжлийн салбар:</span> {user.field_of_study || "Баталгаажуулаагүй"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Мэргэшсэн чиглэл:</span> {user.expertise || "Баталгаажуулаагүй"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-lg font-medium text-red-600">Хэрэглэгч нэвтрээгүй эсвэл мэдээлэл олдсонгүй.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[500px] max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of Graduates</h3>
            <p className="text-2xl font-bold text-green-600">{numberOfGraduates}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of Instructors</h3>
            <p className="text-2xl font-bold text-blue-600">{numberOfInstructors}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of Trainings</h3>
            <p className="text-2xl font-bold text-yellow-600">{numberOfTrainings}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of Active Trainings</h3>
            <p className="text-2xl font-bold text-purple-600">{numberOfActiveTrainings}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}