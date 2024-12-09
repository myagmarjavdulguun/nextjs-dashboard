import { getTrainings } from "@/app/lib/data";
import EditTrainingForm from "@/app/ui/edit-training-form";

export default async function Page({ params }: { params: Promise<{
    id: string;
  }>; }) {
    const id = (await params).id;
    const training = await getTrainings(id)

    return (
        <div>
            <EditTrainingForm training={training[0]} />
        </div>
    );
}