import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";

const QuizSolvingPage = () => {
  const { id } = useParams();
  const axios = useAxios();

  const [timer, setTimer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  // console.log(
  //   "Current Question: ",
  //   currentQuestion,
  //   quizData?.questions[currentQuestion - 1].title,
  // );
  // console.log("Question Status: ", questionStatus);
  // console.log("Answers: ", answers);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/student/test/${id}/details`);
        console.log(response.data.test);
        setQuizData(response.data.test);
        setTimer(response.data.test.time * 60);
        setQuestionStatus(
          new Array(response.data.test.questions.length).fill("notVisited"),
        );
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
    };

    fetchQuiz();
  }, [id, axios]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !submitted) {
      // Handle time expiration
      alert("Time's up! Submitting quiz...");
      handleSubmitQuiz();
    }
  }, [timer, submitted]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNavigation = (direction) => {
    const newQuestion =
      direction === "next"
        ? Math.min(currentQuestion + 1, quizData?.questions.length)
        : Math.max(currentQuestion - 1, 1);
    setCurrentQuestion(newQuestion);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index + 1);
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[questionId] = selectedOption;
      return updated;
    });
    updateQuestionStatus("answered");
  };

  const updateQuestionStatus = (status) => {
    setQuestionStatus((prev) => {
      const updated = [...prev];
      updated[currentQuestion - 1] = status;
      return updated;
    });
  };

  const handleMarkForReview = () => {
    updateQuestionStatus("markedForReview");
    handleNavigation("next");
  };

  const handleSaveAndNext = () => {
    if (!answers[currentQuestion - 1]) {
      updateQuestionStatus("notAnswered");
    } else updateQuestionStatus("answered");
    handleNavigation("next");
  };

  const handleClearResponse = () => {
    updateQuestionStatus("notAnswered");
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion - 1] = null;
      return updated;
    });
  };

  const handleSubmitQuiz = async () => {
    setSubmitted(true);

    let correctAnswers = 0;
    const result = quizData?.questions.map((question, index) => {
      const selectedAnswer = answers[index];
      const isCorrect = selectedAnswer === question.solution;
      if (isCorrect) correctAnswers++;
      return {
        question: question.title,
        selectedAnswer,
        correctAnswer: question.solution,
        isCorrect,
      };
    });
    try {
      const res = axios.post(`/student/test/${quizData._id}/marks`, {
        marks: correctAnswers,
      });
    } catch (error) {
      console.log(error);
    }

    setResult({
      correctAnswers,
      totalQuestions: quizData?.questions.length,
      resultDetails: result,
      timeTaken: timer - timer, // Remaining time = initial time - time left
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Timer and Candidate Info */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{quizData?.name}</h1>
        <div>
          <p>Time Remaining: {formatTime(timer)}</p>
        </div>
      </div>

      {!submitted ? (
        <div className="grid grid-cols-4 gap-4">
          {/* Question Content */}
          <div className="col-span-3 bg-gray-800 p-4 rounded">
            {quizData ? (
              <>
                <h2 className="text-lg font-bold mb-2">
                  Question {currentQuestion}:
                </h2>
                <p className="mb-4">
                  {quizData.questions[currentQuestion - 1].title}
                </p>
                <div className="space-y-2">
                  {quizData.questions[currentQuestion - 1].options.map(
                    (option: string, idx: number) => (
                      <label key={idx} className="block">
                        <input
                          type="radio"
                          name={`question${currentQuestion}`}
                          value={idx}
                          checked={answers[currentQuestion - 1] === idx}
                          onChange={() =>
                            handleAnswerChange(currentQuestion - 1, idx)
                          }
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ),
                  )}
                </div>

                <div className="mt-4 space-x-2">
                  <button
                    className="bg-blue-600 px-4 py-2 rounded"
                    onClick={handleSaveAndNext}
                  >
                    Save & Next
                  </button>
                  <button
                    className="bg-yellow-500 px-4 py-2 rounded"
                    onClick={handleMarkForReview}
                  >
                    Save & Mark for Review
                  </button>
                  <button
                    className="bg-gray-600 px-4 py-2 rounded"
                    onClick={handleClearResponse}
                  >
                    Clear Response
                  </button>
                  <button
                    className="bg-red-600 px-4 py-2 rounded"
                    onClick={handleSubmitQuiz}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <p>Loading quiz...</p>
            )}
          </div>

          {/* Question Palette */}
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold mb-2">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {questionStatus.map((status, idx) => (
                <button
                  key={idx}
                  className={`w-10 h-10 rounded ${
                    status === "notVisited"
                      ? "bg-gray-600"
                      : status === "answered"
                        ? "bg-green-500"
                        : status === "notAnswered"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                  }`}
                  onClick={() => handleQuestionSelect(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          {/* <p>Time Taken: {formatTime(result.timeTaken)}</p> */}
          <p>
            Correct Answers: {result.correctAnswers}/{result.totalQuestions}
          </p>
          <div className="mt-4">
            <h3 className="font-bold">Answer Details:</h3>
            {result.resultDetails.map((item, index) => {
              return (
                <div key={index} className="mt-2">
                  <p>
                    <strong>Question {index + 1}: </strong>
                    {item.question}
                  </p>
                  <p>
                    <strong>Your Answer: </strong>
                    {quizData.questions[index].options[item.selectedAnswer]}
                    <span
                      className={`ml-2 ${item.isCorrect ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.isCorrect ? "Correct" : "Wrong "}
                    </span>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-red-500">
                      <strong>
                        Correct Answer:{" "}
                        {
                          quizData.questions[index].options[
                            quizData.questions[index].solution
                          ]
                        }
                      </strong>
                    </p>
                  )}{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSolvingPage;
