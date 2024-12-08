import { getParticipations, getTrainings, isLoggedIn } from "@/app/lib/data";
import TrainingDetails from "@/app/ui/trainings-detail";
import { notFound } from "next/navigation";

export default async function TrainingDetailsPage({ params }: { params: Promise<{
  id: string;
}>; }) {
  const training_id = (await params).id;

  const data = await isLoggedIn();
  
  const [training, participations] = await Promise.all([
    getTrainings(training_id),
    getParticipations(training_id),
  ]);

  if (!training) {
    notFound(); 
  }

  return (
    <div className="container mx-auto mt-6 p-4">
      <TrainingDetails 
        training={training[0]} 
        participations={participations} 
        usertype={data?.sessionData.usertype} 
      />
    </div>
  );
}
