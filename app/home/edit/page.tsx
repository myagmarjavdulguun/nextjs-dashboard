import { getUser, isLoggedIn } from "@/app/lib/data";
import ChangePasswordForm from "@/app/ui/change-password-form";
import ChangeSkillsToLearn from "@/app/ui/change-skills-to-learn";

export default async function Page() {
  const data = await isLoggedIn();
  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-600">Хэрэглэгчийн мэдээлэл олдсонгүй.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          {user.user_type === "graduate" ? "Ур чадвар болон Нууц үг шинэчлэх" : "Нууц үг шинэчлэх"}
        </h1>

        <ChangePasswordForm username={data?.sessionData.username} usertype={data?.sessionData.usertype} />

        {user.user_type === "graduate" && (
          <ChangeSkillsToLearn graduate_id={user.graduate_id} skills_to_learn={user.skills_to_learn} />
        )}
      </div>
    </div>
  );
}
