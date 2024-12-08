'use client';

import { useRouter } from 'next/navigation';
import GraduateTable from './graduate-table';

function TrainingDetails({
  training,
  participations,
  usertype,
}: {
  training: any;
  participations: any;
  usertype: string;
}) {
  const router = useRouter();

  // Number of participants currently enrolled
  const participationCount = participations.length;

  // Maximum participants allowed
  const maxParticipants = training.max_participants;

  // Calculate the participation progress as a percentage
  const participationProgress = maxParticipants > 0 ? (participationCount / maxParticipants) * 100 : 0;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-teal-50 to-green-50">
      <button
        onClick={router.back}
        className="mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-3 text-white font-semibold text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 shadow-lg transition duration-300 transform hover:scale-105"
      >
        Буцах
      </button>

      <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-800">{training.title}</h1>
        <p className="text-gray-600 mt-2">
          <strong className="text-blue-600">Багш:</strong> {training.first_name} {training.last_name}
        </p>

        <p className="text-gray-700 leading-relaxed">{training.description}</p>

        <div className="mt-6 space-y-4">
          <p className="text-gray-700">
            <strong className="text-blue-600">Салбар:</strong> {training.field_of_study}
          </p>
          <p className="text-gray-700">
            <strong className="text-blue-600">Эхлэх огноо:</strong>{' '}
            {new Date(training.start_date).toLocaleDateString('mn-MN')}
          </p>
          <p className="text-gray-700">
            <strong className="text-blue-600">Дуусах огноо:</strong>{' '}
            {new Date(training.end_date).toLocaleDateString('mn-MN')}
          </p>
          <p className="text-gray-700">
            <strong className="text-blue-600">Байршил:</strong> {training.location}
          </p>
          <p className="text-gray-700">
            <strong className="text-blue-600">Төлбөр:</strong> {training.price}₮
          </p>

          {/* Participation Progress Bar */}
          <div className="mt-6">
            <p className="text-gray-700">
              <strong className="text-blue-600">Хамрагдсан:</strong> {participationCount} / {maxParticipants}
            </p>

            <div className="w-1/2 bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full shadow-lg"
                style={{ width: `${participationProgress}%` }}
              ></div>
            </div>

            <p className="mt-2 text-gray-600">{participationProgress.toFixed(0)}% суудал дүүрсэн.</p>
          </div>
        </div>
      </div>

      {/* Render Graduate Table if usertype is "instructor" */}
      {usertype === 'instructor' && participations && (
        <div>
          <h2 className="mt-8 text-xl font-bold text-gray-800">Бүртгэлтэй суралцагчид</h2>
          <GraduateTable graduates={participations} />
        </div>
      )}
    </div>
  );
}

export default TrainingDetails;
