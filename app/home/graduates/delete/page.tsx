import DeleteGraduateButton from '@/app/ui/delete-graduate-button';
import { fetchGraduates } from '@/app/lib/data';

export default async function GraduatesPage() {
  const graduates = await fetchGraduates();

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
          {graduates.map((graduate) => (
            <tr key={graduate.id}>
              <td className="px-4 py-2">{graduate.first_name}</td>
              <td className="px-4 py-2">{graduate.last_name}</td>
              <td className="px-4 py-2">{graduate.username}</td>
              <td className="px-4 py-2">{graduate.field_of_study}</td>
              <td className="px-4 py-2">{graduate.major}</td>
              <td className="px-4 py-2">
                <DeleteGraduateButton graduate_id={graduate.graduate_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
