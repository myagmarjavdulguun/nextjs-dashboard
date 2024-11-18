import { getAcceptedInstructors, getOtherInstructors, getRequestedInstructors, getUser, isLoggedIn } from "@/app/lib/data";
import DeleteRequestButton from "@/app/ui/delete-request-button";
import Table from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  ChatBubbleLeftIcon, 
} from '@heroicons/react/24/outline';
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const data = await isLoggedIn();
  const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);
  const username = data ? data.sessionData.username : '';

  const acceptedInstructors = await getAcceptedInstructors(username);
  const requestedInstructors = await getRequestedInstructors(username);
  const otherInstructors = await getOtherInstructors(username);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          <HomeIcon className="inline-block w-6 h-6 text-blue-600 mr-2" />
          Багш
        </h1>

        <section className="mt-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            Багшийг хайх
          </h2>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Багш хайх..." />
          </div>
          <Table query={query} graduate_id={user?.graduate_id} />
        </section>

        <section>
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            Хүсэлт авсан багш
          </h2>
          <div className="space-y-6">
            {acceptedInstructors.length > 0 ? (
              acceptedInstructors.map((instructor) => (
                <div
                  key={instructor.username}
                  className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{instructor.first_name} {instructor.last_name}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                      Мэргэжлийн салбар: {instructor.field_of_study}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <BriefcaseIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                      Мэргэжлийн чиглэл: {instructor.expertise}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <DeleteRequestButton 
                      request_id={instructor.request_id}
                      query={query}
                    />
                    <Link
                      href={'/home/messages?graduate=' + instructor.instructor_id}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>Мессеж</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Багш олдсонгүй.</p>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            Хүсэлт илгээсэн багш
          </h2>
          <div className="space-y-6">
            {requestedInstructors.length > 0 ? (
              requestedInstructors.map((instructor) => (
                <div
                  key={instructor.username}
                  className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{instructor.first_name} {instructor.last_name}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                      Мэргэжлийн салбар: {instructor.field_of_study}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <BriefcaseIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                      Мэргэжлийн чиглэл: {instructor.expertise}
                    </p>
                  </div>
                  <DeleteRequestButton 
                    request_id={instructor.request_id}
                    query={query}
                  />
                </div>
              ))
            ) : (
              <p>Багш олдсонгүй.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
