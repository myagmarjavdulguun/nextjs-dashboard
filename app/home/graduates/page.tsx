import {
    getIncomingRequestsForInstructor,
    getUser,
    isLoggedIn,
    getAcceptedGraduates,
    getFilteredGraduates,
  } from "@/app/lib/data";
  import AcceptRequestButton from "@/app/ui/accept-request-button";
  import DeleteRequestButton from "@/app/ui/delete-request-button";
import GraduateTable from "@/app/ui/graduate-table";
  import Search from "@/app/ui/search";
  import {
    UserGroupIcon,
    AcademicCapIcon,
    HomeIcon,
  } from "@heroicons/react/24/outline";
  
  export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
  
    const data = await isLoggedIn();
    const user = await getUser(data?.sessionData.username, data?.sessionData.usertype);
    const instructor_id = user?.instructor_id;
  
    const incomingRequests = await getIncomingRequestsForInstructor(instructor_id);
    const acceptedGraduates = await getAcceptedGraduates(data?.sessionData.username);
    const graduates = await getFilteredGraduates(query);
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            <HomeIcon className="inline-block w-6 h-6 text-blue-600 mr-2" />
            Төгсөгчийн хүсэлтүүд ба хайлт
          </h1>
  
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
              Төгсөгч хайх
            </h2>
            <Search placeholder="Төгсөгч хайх..." />
            <GraduateTable graduates={graduates} />
          </section>
  
          <section className="mt-12">
            <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
              Ирсэн хүсэлтүүд
            </h2>
            <div className="space-y-6">
              {incomingRequests.length > 0 ? (
                incomingRequests.map((graduate) => (
                  <div
                    key={graduate.request_id}
                    className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600">
                        {graduate.first_name} {graduate.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                        {graduate.field_of_study}, {graduate.major}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                        Эзэмшихийг хүссэн чадвар: {graduate.skills_to_learn}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <AcceptRequestButton request_id={graduate.request_id} query={query} />
                      <DeleteRequestButton request_id={graduate.request_id} query={query} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Ирсэн хүсэлт алга байна.</p>
              )}
            </div>
          </section>
  
          <section className="mt-12">
            <h2 className="text-2xl font-medium text-gray-700 mb-4 flex items-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
              Баталсан төгсөгчид
            </h2>
            <div className="space-y-6">
              {acceptedGraduates.length > 0 ? (
                acceptedGraduates.map((graduate) => (
                  <div
                    key={graduate.graduate_id}
                    className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">
                        {graduate.first_name} {graduate.last_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                        {graduate.field_of_study}, {graduate.major}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <AcademicCapIcon className="inline-block w-4 h-4 text-gray-500 mr-1" />
                        Эзэмшихийг хүссэн чадвар: {graduate.skills_to_learn}
                    </p>
                  </div>
                ))
              ) : (
                <p>Зөвшөөрсөн суралцагч алга байна.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
  