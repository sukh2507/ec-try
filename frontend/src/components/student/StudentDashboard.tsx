import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const StudentDashboard = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    console.log(`Navigating to ${path}`); // Replace with actual navigation logic
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Browse All Quizzes Card */}
        <Card className="bg-gray-100 dark:bg-black">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Browse All Quizzes</h2>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Explore all available quizzes and challenge yourself to learn more.
            </p>
            <Button
              onClick={() => navigate("/student/all-quizzes")}
              className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Browse Quizzes
            </Button>
          </CardContent>
        </Card>

        {/* My Quizzes Card */}
        <Card className="bg-gray-100 dark:bg-black">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">My Quizzes</h2>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              View the quizzes you have started or completed.
            </p>
            <Button
              onClick={() => navigate("/student/my-quizzes")}
              className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
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
