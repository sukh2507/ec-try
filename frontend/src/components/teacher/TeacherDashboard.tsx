import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-white mb-12 mt-10">
        Teacher Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-6">
        {/* Card 1: Create a Test */}
        <div className="group p-8 bg-white shadow-lg rounded-xl flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="text-blue-500 mb-6 group-hover:animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create a Test
          </h2>
          <Link
            to="/teacher/create-quiz"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transform transition-all duration-300 hover:translate-y-[-3px]"
          >
            Start Now
          </Link>
        </div>

        {/* Card 2: Show All Tests */}
        <div className="group p-8 bg-white shadow-lg rounded-xl flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="text-green-500 mb-6 group-hover:animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Show All Tests
          </h2>
          <Link
            to="/teacher/all-quizzes"
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 focus:ring-4 focus:ring-green-300 transform transition-all duration-300 hover:translate-y-[-3px]"
          >
            View Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
