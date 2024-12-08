import { fetchInstructors, getInstructorTrainings } from '@/app/lib/data';  // Ensure this is the correct import
import DeleteInstructorButton from '@/app/ui/delete-instructor-button';  // Ensure this button is correctly imported
import DeleteTrainingButton from '@/app/ui/delete-training-button';

export default async function InstructorsPage() {
  const instructors = await fetchInstructors();  // Fetch instructors instead of graduates

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Багш нарын жагсаалт</h2>
      <table className="min-w-full table-auto border-separate border-spacing-2 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-2 py-2 text-left">Нэр</th>
            <th className="px-2 py-2 text-left">Овог</th>
            <th className="px-2 py-2 text-left">Нэвтрэх нэр</th>
            <th className="px-2 py-2 text-left">Мэргэжлийн салбар</th>
            <th className="px-2 py-2 text-left">Мэргэжлийн чиглэл</th>
            <th className="px-2 py-2">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {instructors.map((instructor) => (
            <InstructorRow key={instructor.id} instructor={instructor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function InstructorRow({ instructor }: { instructor: any }) {
  const trainings = await getInstructorTrainings(instructor.instructor_id);  // Fetch trainings for the instructor
  console.log('instructor', instructor);

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50 transition-all duration-200">
        <td className="px-2 py-2">{instructor.first_name}</td>
        <td className="px-2 py-2">{instructor.last_name}</td>
        <td className="px-2 py-2">{instructor.username}</td>
        <td className="px-2 py-2">{instructor.field_of_study}</td>
        <td className="px-2 py-2">{instructor.expertise}</td>
        <td className="px-2 py-2">
          {/* Ensure the DeleteInstructorButton stays visible */}
          <DeleteInstructorButton instructor_id={instructor.instructor_id} />
        </td>
      </tr>
      {trainings && trainings.length > 0 && (
        <tr>
          <td colSpan={6} className="bg-gray-50 px-2 py-2">
            <details className="bg-blue-100 rounded-lg shadow-md p-1">
              <summary className="text-blue-600 cursor-pointer font-semibold">Сургалтууд</summary>
              <ul className="mt-2 space-y-2">
              {trainings.map((training) => (
                <li key={training.id} className="border-b pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-blue-600">{training.title}</p>
                    <p className="text-sm text-gray-700">{training.description}</p>
                  </div>
                  <DeleteTrainingButton 
                    training_id={training.training_id}
                    query=''
                  />
                </li>
              ))}
              </ul>
            </details>
          </td>
        </tr>
      )}
    </>
  );
}
