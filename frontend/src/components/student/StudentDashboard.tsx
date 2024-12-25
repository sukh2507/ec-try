import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-10 text-center">
        Student Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Browse All Quizzes Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-white">Browse All Quizzes</h2>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full">
            <p className="text-white opacity-80 mb-4">
              Explore all available quizzes and challenge yourself to learn more.
            </p>
            <Button
              onClick={() => navigate("/student/all-quizzes")}
              className="bg-white hover:bg-opacity-90 text-gray-800 font-semibold rounded-md px-6 py-3 transition-all transform hover:scale-105"
            >
              Browse Quizzes
            </Button>
          </CardContent>
        </Card>

        {/* My Quizzes Card */}
        <Card className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-white">My Quizzes</h2>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full">
            <p className="text-white opacity-80 mb-4">
              View the quizzes you have started or completed.
            </p>
            <Button
              onClick={() => navigate("/student/my-quizzes")}
              className="bg-white hover:bg-opacity-90 text-gray-800 font-semibold rounded-md px-6 py-3 transition-all transform hover:scale-105"
            >
              View My Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
