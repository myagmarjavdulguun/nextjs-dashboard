import { getParticipations, getTrainings, isLoggedIn } from "@/app/lib/data";
import TrainingDetails from "@/app/ui/trainings-detail";

export default async function TrainingDetailsPage({ params }: { params: { training_id: string } }) {
  const data = await isLoggedIn();
  const { training_id } = params;

  const training = await getTrainings(training_id);
  const participations = await getParticipations(training_id);

  if (!training) {
    return <div>Training not found</div>;
  }

  return (
    <div className="container mx-auto mt-6 p-4">
      <TrainingDetails training={training[0]} participations={participations} usertype={data?.sessionData.usertype} />
    </div>
  );
}
