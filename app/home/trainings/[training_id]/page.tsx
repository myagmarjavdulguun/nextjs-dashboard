import { getParticipations, getTrainings, isLoggedIn } from "@/app/lib/data";
import TrainingDetails from "@/app/ui/trainings-detail";

export default async function Page({ params }: { params: { training_id: string } }) {
  const { training_id } = params;  // Destructuring training_id from params

  const data = await isLoggedIn();  // Fetch login data
  const [training, participations] = await Promise.all([  // Fetch training and participations in parallel
    getTrainings(training_id),
    getParticipations(training_id)
  ]);

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
