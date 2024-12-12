import useAxios from "@/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Teacher from "@/components/Teacher"
import CreateQuiz from "./CreateQuiz";
import AllQuizzes from "./AllQuizzes";
import EditQuiz from "./EditQuiz";


const ProtectedComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  // Dummy quiz data
  const [quizzes, setQuizzes] = useState([
    {
      name: "Math Quiz",
      description: "Test your math skills!",
      price: 10,
      questions: [
        { title: "2 + 2?", options: ["3", "4", "5"], solution: 1 },
        { title: "5 x 6?", options: ["28", "30", "32"], solution: 1 },
      ],
    },
    {
      name: "Science Quiz",
      description: "Explore the world of science.",
      price: 20,
      questions: [
        { title: "What is the symbol for water?", options: ["H2O", "O2", "CO2"], solution: 0 },
      ],
    },
  ]);

  const [editingQuiz, setEditingQuiz] = useState(null);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };

  const handleDelete = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
    alert("Quiz deleted successfully.");
  };

  const handleSave = (updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.name === updatedQuiz.name ? updatedQuiz : quiz
    );
    setQuizzes(updatedQuizzes);
    setEditingQuiz(null); // Exit editing mode
  };

  const checkStatus = async () => {
    setIsLoading(true);
    try {
      await axios.get("/protect");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-center allign-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
        You are logged in!
      </h1>
      <CreateQuiz />
      <div>
        {editingQuiz ? (
          <EditQuiz quizToEdit={editingQuiz} onSave={handleSave} />
        ) : (
          <AllQuizzes quizzes={quizzes} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
      <Button onClick={checkStatus} disabled={isLoading ? true : false}>
        {isLoading ? <LoaderCircle className="spinner" /> : "Check Status"}
      </Button>
    </div>
  );
};

export default ProtectedComp;
