import { getParticipations, getTrainings, isLoggedIn } from "@/app/lib/data";
import TrainingDetails from "@/app/ui/trainings-detail";
import { notFound } from "next/navigation";  // Importing next/navigation for notFound() handling

export default async function TrainingDetailsPage({ params }: { params: { training_id: string } }) {
  // Destructure training_id from params
  const { training_id } = params;

  // Fetch login data
  const data = await isLoggedIn();
  
  // Fetch training and participations data in parallel
  const [training, participations] = await Promise.all([
    getTrainings(training_id),
    getParticipations(training_id),
  ]);

  // If no training found, trigger 404 page
  if (!training) {
    notFound();  // Automatically redirects to a 404 page if no training is found
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
