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

        {/* Training Categories Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
              <PlayCircleIcon className="h-5 w-5 text-blue-500" />
              Interactive Training
            </h2>
            <p className="text-md text-gray-700 mb-4">
              Engage with interactive exercises that test your knowledge and skills.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
              Start Interactive Training
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-green-500" />
              Training Modules
            </h2>
            <p className="text-md text-gray-700 mb-4">
              Browse through structured training modules that guide you step by step.
            </p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
              Browse Training Modules
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
              <PlayCircleIcon className="h-5 w-5 text-purple-500" />
              Video Tutorials
            </h2>
            <p className="text-md text-gray-700 mb-4">
              Watch video tutorials to learn from experts in the field.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300">
              Watch Tutorials
            </button>
          </div>
        </div>

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
