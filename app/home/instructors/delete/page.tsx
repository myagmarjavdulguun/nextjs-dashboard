// pages/admin/instructors.tsx (Server-side component)
import DeleteInstructorButton from '@/app/ui/delete-instructor-button';
import { fetchInstructors } from '@/app/lib/data';

export default async function InstructorsPage() {
  // Fetch all instructors
  const instructors = await fetchInstructors();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Багш нарын жагсаалт</h2>
      <table className="min-w-full table-auto border-separate border-spacing-2">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Нэр</th>
            <th className="px-4 py-2 text-left">Овог</th>
            <th className="px-4 py-2 text-left">Нэвтрэх нэр</th>
            <th className="px-4 py-2 text-left">Мэргэжлийн салбар</th>
            <th className="px-4 py-2 text-left">Мэргэжлийн чиглэл</th>
            <th className="px-4 py-2">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td className="px-4 py-2">{instructor.first_name}</td>
              <td className="px-4 py-2">{instructor.last_name}</td>
              <td className="px-4 py-2">{instructor.username}</td>
              <td className="px-4 py-2">{instructor.field_of_study}</td>
              <td className="px-4 py-2">{instructor.expertise}</td>
              <td className="px-4 py-2">
                {/* Pass instructorId for the deletion button */}
                <DeleteInstructorButton instructor_id={instructor.instructor_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
