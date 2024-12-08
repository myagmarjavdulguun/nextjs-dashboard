import Link from "next/link";
import { getInstructorTrainings, getGraduateTrainings, isLoggedIn, getGraduateNumber, getInstructorNumber, getTrainingNumber, getActiveTrainingNumber } from "../lib/data";
import { getUser } from "../lib/data";
import { UserIcon, BriefcaseIcon, PencilIcon } from '@heroicons/react/24/outline';
import HomeTraining from "../ui/home-page-training";

export default async function Page() {
  const data = await isLoggedIn();

  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);

  const numberOfGraduates = await getGraduateNumber();
  const numberOfInstructors = await getInstructorNumber();
  const numberOfTrainings = await getTrainingNumber();
  const numberOfActiveTrainings = await getActiveTrainingNumber();

  const currentTrainings = data?.sessionData.usertype === 'graduate' ? await getGraduateTrainings(user?.graduate_id) : await getInstructorTrainings(user?.instructor_id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      {data?.sessionData.usertype != 'admin' ? (
        <div className="min-h-[500px] max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Таны сургалтууд</h2>
            <div className="space-y-4">
              {currentTrainings.length > 0 ? (
                currentTrainings.map((training, index) => (
                  <HomeTraining training={training} />
                ))
              ) : (
                <p className="text-sm text-gray-600">Сургалт олдсонгүй.</p>
              )}
            </div>
          </div>
  
          <div className="space-y-6">
            {user ? (
              <div>
                <h1 className="text-4xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                  Сайн уу, {user.first_name} {user.last_name}!
                </h1>
  
                <div className="space-y-6">
                  {user.user_type === "graduate" && (
                    <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-medium text-gray-800 mb-4 flex justify-between gap-2">
                        <div>
                          <UserIcon className="h-5 w-5 text-blue-500" />
                          Таны мэдээлэл
                        </div>
                        <div>
                          <Link href={'/home/edit'}>
                            <PencilIcon className="h-5 w-5 text-blue-500" />
                          </Link>
                        </div>
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
  
                  {user.user_type === "instructor" && (
                    <div className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <div>
                          <UserIcon className="h-5 w-5 text-blue-500" />
                          Таны мэдээлэл
                        </div>
                        <div>
                          <Link href={'/home/edit'}>
                            <PencilIcon className="h-5 w-5 text-blue-500" />
                          </Link>
                        </div>
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