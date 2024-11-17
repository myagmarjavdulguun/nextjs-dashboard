import { getFilteredTrainings, getTrainings, getUser, isLoggedIn } from '@/app/lib/data';
import Search from '@/app/ui/search';
import TrainingTable from '@/app/ui/trainings-table';
import { BookOpenIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const data = await isLoggedIn();

  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);
  const trainings = await getFilteredTrainings(query);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
          <PlayCircleIcon className="h-5 w-5 text-orange-500" />
          Training Events
        </h2>
        <div className="space-y-4">
          <Search placeholder='Сургалт хайх...' />
          <TrainingTable query={query} graduate_id={user?.graduate_id} trainings={trainings} />
        </div>
      </div>
    </div>
  );
}
