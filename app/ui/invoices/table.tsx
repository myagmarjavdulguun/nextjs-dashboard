import { getFilteredInstructors } from '@/app/lib/data';
import Link from 'next/link';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import RequestButton from '../create-request-form';
import DeleteRequestButton from '../delete-request-button';

export default async function InvoicesTable({
  query,
  graduate_id,
}: {
  query: string;
  graduate_id: string;
}) {
  const instructors = await getFilteredInstructors(query, graduate_id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Нэр
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Мэргэжлийн салбар
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Мэргэжлийн чиглэл
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Төлөв
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {instructors?.map((instructor) => (
                <tr
                  key={instructor.instructor_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {instructor.first_name} {instructor.last_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {instructor.field_of_study}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {instructor.expertise}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {instructor.status == 'pending' ? (
                      <DeleteRequestButton
                        request_id={instructor.request_id}
                        query={query}
                      />
                    ) : instructor.status == 'accepted' ? (
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                      >
                        <Link
                          className="bg-blue-500 text-white rounded-lg flex items-center space-x-2"
                          href={'/home/messages?graduate=' + instructor.instructor_id}
                        >
                          <ChatBubbleLeftIcon className="w-5 h-5" />
                          <span>Мессеж</span>
                        </Link>
                      </button>
                    ) : (
                      <RequestButton 
                        graduate_id={graduate_id}
                        instructor_id={instructor.instructor_id}
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
    </div>
  );
}
