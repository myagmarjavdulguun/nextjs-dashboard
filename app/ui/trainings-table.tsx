'use client';

export default function TrainingTable({
  trainings,
  onParticipate,
}: {
  trainings: Array<{
    training_id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    max_participants: number;
    min_participants: number;
    price: number;
    first_name: string;
    last_name: string;
  }>;
  onParticipate: (trainingId: string) => void;
}) {
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
                  className="border-b text-sm hover:bg-gray-100 transition-all"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {training.first_name} {training.last_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{training.title}</td>
                  <td className="px-3 py-3">{training.description}</td>
                  <td className="px-3 py-3">
                    {new Date(training.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">
                    {new Date(training.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">{training.location}</td>
                  <td className="px-3 py-3">{training.price}₮</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => onParticipate(training.training_id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Сургалтад хамрагдах
                    </button>
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
