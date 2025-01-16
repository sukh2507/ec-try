import { useState, useEffect } from "react";
import EditQuiz from "./EditQuiz";
import useAxios from "@/hooks/useAxios";
import { Spinner } from "../ui/Spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ShowAllQuizzes = () => {
  const axios = useAxios();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_Backend_url}/teacher/test`);
        setQuizzes(response.data.tests);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [axios]);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };

  // const handleDelete = async  (id) => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_Backend_url}/teacher/test/${id}`);
  //     const updatedQuizzes = quizzes.filter((quiz) => quiz._id !== id);
  //     setQuizzes(updatedQuizzes);
  //     alert("Quiz deleted successfully.");
  //   } catch (error) {
  //     alert("Failed to delete quiz. Please try again.");
  //   }
  // };

  const handleSave = async (updatedQuiz) => {
    try {
      await axios.put(`${import.meta.env.VITE_Backend_url}/teacher/test/${updatedQuiz._id}`, updatedQuiz);
      const updatedQuizzes = quizzes.map((quiz) =>
        quiz._id === updatedQuiz._id ? updatedQuiz : quiz,
      );
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setEditingQuiz(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner  />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Card className="mb-6 bg-white dark:bg-black shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            All Quizzes
          </CardTitle>
        </CardHeader>
      </Card>
      {editingQuiz ? (
        <EditQuiz quizToEdit={editingQuiz} onSave={handleSave} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card
              key={quiz._id}
              className="bg-white dark:bg-gray-800 shadow-lg transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white font-bold text-lg">
                  {quiz.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p>{quiz.description}</p>
                <p className="mt-2 font-semibold">Price: ${quiz.price}</p>
                <p className="font-semibold">Time: {quiz.time} mins</p>
                <p className="font-semibold">
                  Status: {quiz.isVerified ? "✅" : "❌"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => handleEdit(quiz)}
                  className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Edit
                </Button>
                {/* <Button
                                    onClick={() => handleDelete(quiz._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
                                >
                                    Delete
                                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllQuizzes;
