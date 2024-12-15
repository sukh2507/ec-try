import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Card 1: Create a Quiz */}
        <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
          <div className="text-blue-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-4">Create a Test</h2>
          <Link
            to="/teacher/create-quiz"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Now
          </Link>
        </div>

        {/* Card 2: Show All Quizzes */}
        <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
          <div className="text-green-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-4">Show All Tests</h2>
          <Link
            to="/teacher/all-quizzes"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View Quizzes
          </Link>
        </div>

        {/* Card 3: Analyze Results */}
        <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
          <div className="text-yellow-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18m9-9H3"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-4">Analyze Results</h2>
          <Link
            to="/analyze-results"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Analyze Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

