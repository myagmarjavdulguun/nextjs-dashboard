import { getUser, isLoggedIn } from "@/app/lib/data";
import CreateTrainingForm from "@/app/ui/create-training-form";

export default async function Page() {
    const data = await isLoggedIn();
    const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);

    return (
        <div>
            <CreateTrainingForm instructor_id={user?.instructor_id} />
        </div>
    );
}