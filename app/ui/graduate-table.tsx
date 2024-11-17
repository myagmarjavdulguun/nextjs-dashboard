'use client';

export default function GraduateTable({
  graduates,
}: {
  graduates: Array<any>;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-4 md:pt-0 shadow-md">
          <table className="min-w-full text-gray-900">
            <thead className="bg-gray-200 text-left text-sm font-semibold">
              <tr>
                <th className="px-4 py-5">Нэр</th>
                <th className="px-3 py-5">Мэргэжлийн талбар</th>
                <th className="px-3 py-5">Мэргэжлийн чиглэл</th>
                <th className="px-3 py-5">Суралцахыг хүссэн чадвар</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {graduates.map((graduate) => (
                <tr
                  key={graduate.graduate_id}
                  className="border-b text-sm transition-all"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {graduate.first_name} {graduate.last_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{graduate.field_of_study}</td>
                  <td className="px-3 py-3">{graduate.major}</td>
                  <td className="px-3 py-3">{graduate.skills_to_learn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
