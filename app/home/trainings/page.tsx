import { BookOpenIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <BookOpenIcon className="h-6 w-6 text-green-600" />
          Training Resources
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Explore various training modules and courses designed to enhance your skills. Choose a category to start your learning journey!
        </p>

        {/* Upcoming Training Events */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
            <PlayCircleIcon className="h-5 w-5 text-orange-500" />
            Upcoming Training Events
          </h2>
          <div className="space-y-4">
            {/* Example Training Event */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
              <div>
                <p className="text-lg font-semibold text-gray-800">Advanced JavaScript</p>
                <p className="text-sm text-gray-600">Learn the latest JavaScript techniques and features.</p>
              </div>
              <p className="text-xs text-gray-500">Date: 2024-12-01</p>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
              <div>
                <p className="text-lg font-semibold text-gray-800">React Mastery</p>
                <p className="text-sm text-gray-600">Deep dive into advanced React patterns and best practices.</p>
              </div>
              <p className="text-xs text-gray-500">Date: 2024-12-10</p>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
              <div>
                <p className="text-lg font-semibold text-gray-800">Node.js for Beginners</p>
                <p className="text-sm text-gray-600">Start your journey with Node.js by building simple web apps.</p>
              </div>
              <p className="text-xs text-gray-500">Date: 2024-12-15</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
