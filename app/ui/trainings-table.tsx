'use client';

import { useRouter } from 'next/navigation';
import ParticipationButton from './create-participation-form';

export default function TrainingTable({
  trainings,
  query,
  graduate_id,
}: {
  trainings: Array<any>;
  query: string;
  graduate_id: string;
}) {
  const router = useRouter();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-4 md:pt-0 shadow-md">
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
                <th className="px-3 py-5">Төлбөр</th>
                <th className="px-3 py-5">Хамрагдах</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {trainings.map((training) => (
                <tr
                  key={training.training_id}
                  className="border-b text-sm transition-all"
                >
                  <td className="whitespace-nowrap px-1 py-1">
                    {training.first_name} {training.last_name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => router.push(`/home/trainings/${training.training_id}`)}
                  >{training.title}</td>
                  <td className="px-1 py-1">{training.description.length < 40 ? training.description : training.description.substring(0, 40) + '...'}</td>
                  <td className="px-1 py-1">{training.field_of_study}</td>
                  <td className="px-1 py-1">
                    {new Date(training.start_date).toLocaleDateString('en-US')}
                  </td>
                  <td className="px-1 py-1">
                    {new Date(training.end_date).toLocaleDateString('en-US')}
                  </td>
                  <td className="px-1 py-1">{training.location}</td>
                  <td className="px-1 py-1">{training.price}₮</td>
                  <td className="px-1 py-1">
                    <ParticipationButton
                      graduate_id={graduate_id}
                      training_id={training.training_id}
                      query={query}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
