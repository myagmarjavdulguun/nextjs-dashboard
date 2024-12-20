import { getFilteredTrainings, getGraduateTrainings, getInstructorTrainings, getUser, isLoggedIn } from '@/app/lib/data';
import DeleteParticipation from '@/app/ui/delete-participation-button';
import DeleteTrainingButton from '@/app/ui/delete-training-button';
import Search from '@/app/ui/search';
import TrainingTitle from '@/app/ui/training-title';
import TrainingTable from '@/app/ui/trainings-table';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
  const myTrainings = data?.sessionData.usertype === 'graduate' ? await getGraduateTrainings(user?.graduate_id) : await getInstructorTrainings(user?.instructor_id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">

        {data?.sessionData.usertype == 'instructor' || (
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
              <PlayCircleIcon className="h-5 w-5 text-orange-500" />
              Сургалтууд
            </h2>
            <Search placeholder="Сургалт хайх..." />
            <TrainingTable query={query} graduate_id={user?.graduate_id} trainings={trainings} />
          </div>
        )}

        {data?.sessionData.usertype !== 'instructor' || (
          <div className="mt-2 p-3 max-w-[300px] bg-green-500 rounded text-center">
            <Link href="/home/trainings/create">
              <p className="text-white font-semibold">Сургалт үүсгэх</p>
            </Link>
          </div>
        )}

        <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
          <PlayCircleIcon className="h-5 w-5 text-orange-500" />
          Таны сургалтууд
        </h2>

        <table className="min-w-full text-gray-900">
          <thead className="bg-gray-200 text-left text-sm font-semibold">
            <tr>
              <th className="px-4 py-5">Багш</th>
              <th className="px-3 py-5">Сургалтын нэр</th>
              <th className="px-3 py-5">Тайлбар</th>
              <th className="px-3 py-5">Салбар</th>
              <th className="px-3 py-5">Эхлэх огноо</th>
              <th className="px-3 py-5">Дуусах огноо</th>
              <th className="px-3 py-5">Байршил</th>
              <th className="px-3 py-5">Суудлын тоо</th>
              <th className="px-3 py-5">Төлбөр</th>
              <th className="px-3 py-5">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {myTrainings.map((training) => (
              <tr
                key={training.training_id}
                className="border-b text-sm transition-all"
              >
                <td className="whitespace-nowrap px-1 py-1">
                  {training.first_name} {training.last_name}
                </td>
                <TrainingTitle title={training.title} training_id={training.training_id} />
                <td className="px-1 py-1">{training.description.length < 40 ? training.description : training.description.substring(0, 40) + '...'}</td>
                <td className="px-1 py-1">{training.field_of_study}</td>
                <td className="px-1 py-1">
                  {new Date(training.start_date).toLocaleDateString()}
                </td>
                <td className="px-1 py-1">
                  {new Date(training.end_date).toLocaleDateString()}
                </td>
                <td className="px-1 py-1">{training.location}</td>
                <td className="px-1 py-1">{training.max_participants}</td>
                <td className="px-1 py-1">{training.price == 0 ? 'Үнэгүй' : training.price + '₮'}</td>
                <td className="px-1 py-1">
                  {data?.sessionData.usertype == 'instructor' ? (
                    <div className='flex flex-dir-row gap-2'>
                      <DeleteTrainingButton 
                        training_id={training.training_id}
                        query={query}
                      />
                      <Link 
                        href={`/home/trainings/${training.training_id}/edit`}
                        className='p-2 rounded-lg bg-yellow-200'
                      >Өөрчлөх</Link>
                    </div>
                  ) : (
                    <DeleteParticipation
                      graduate_id={user?.graduate_id}
                      training_id={training.training_id}
                      query={query}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
