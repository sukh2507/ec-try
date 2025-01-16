import { useState } from "react";
import QuestionForm from "../QuestionForm"; // Assuming this component is in the same directory
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({
        name: "",
        description: "",
        price: "",
        time: "",
        questions: [],
    });
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const axios = useAxios();
    const navigate = useNavigate();

    const addQuestion = (question: any) => {
        const updatedQuestions = [...quiz.questions];
        if (editingQuestionIndex !== null) {
            updatedQuestions[editingQuestionIndex] = question;
            setEditingQuestionIndex(null);
        } else {
            updatedQuestions.push(question);
        }
        setQuiz({ ...quiz, questions: updatedQuestions });
        setShowQuestionForm(false);
    };

    const editQuestion = (index: number) => {
        setEditingQuestionIndex(index);
        setShowQuestionForm(true);
    };

    const removeQuestion = (index: number) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.filter((_, i) => i !== index),
        });
    };

    const saveQuiz = async () => {
        console.log("Quiz Saved", quiz);
        try {
            const res = await axios.post(`${import.meta.env.VITE_Backend_url}/teacher/test`, quiz);
            console.log(res);
            navigate("/teacher");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen">
            {/* Left Section */}
            <div className="flex flex-col w-full md:w-1/2 gap-6">
                {/* Quiz Details */}
                <Card className="shadow-lg bg-white dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400">Create Quiz</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Quiz Name</label>
                            <Input
                                value={quiz.name}
                                onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                                placeholder="Enter quiz name"
                                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border focus:ring focus:ring-blue-300"
                            />
                            {!quiz.name && <p className="text-red-500 text-sm">Quiz name is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
                            <Input
                                value={quiz.description}
                                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                placeholder="Enter quiz description"
                                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border focus:ring focus:ring-blue-300"
                            />
                            {!quiz.description && <p className="text-red-500 text-sm">Description is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price</label>
                            <Input
                                type="number"
                                value={quiz.price}
                                onChange={(e) => setQuiz({ ...quiz, price: e.target.value })}
                                placeholder="Enter quiz price"
                                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border focus:ring focus:ring-blue-300"
                            />
                            {!quiz.price && <p className="text-red-500 text-sm">Price is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Time (in minutes)</label>
                            <Input
                                type="number"
                                min={1}
                                max={180}
                                value={quiz.time}
                                onChange={(e) => setQuiz({ ...quiz, time: e.target.value })}
                                placeholder="Enter time in minutes (1-180)"
                                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border focus:ring focus:ring-blue-300"
                            />
                            {(!quiz.time || parseInt(quiz.time) < 1 || parseInt(quiz.time) > 180) && (
                                <p className="text-red-500 text-sm">Time is required (between 1 and 180 minutes).</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {showQuestionForm ? (
                    <QuestionForm
                        onSave={addQuestion}
                        onCancel={() => setShowQuestionForm(false)}
                        existingQuestion={editingQuestionIndex !== null ? quiz.questions[editingQuestionIndex] : null}
                    />
                ) : (
                    <Button
                        onClick={() => setShowQuestionForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md mt-4 py-2 px-4 transition-transform transform hover:scale-105"
                    >
                        Add Question
                    </Button>
                )}

                <Button
                    onClick={saveQuiz}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md mt-4 py-2 px-4 transition-transform transform hover:scale-105"
                >
                    Save Quiz
                </Button>
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-full md:w-1/2 gap-6">
                <Card className="shadow-lg bg-white dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">Added Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {quiz.questions.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400">No questions added yet.</p>
                        )}
                        {quiz.questions.map((q, index) => (
                            <Card
                                key={index}
                                className="shadow-md bg-gray-50 dark:bg-gray-700 border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {`Q${index + 1}: ${q.title}`}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {q.options.map((option: string, i: number) => (
                                        <p
                                            key={i}
                                            className={`${q.solution === i ? "font-bold text-blue-600 dark:text-blue-400" : ""
                                                } text-gray-800 dark:text-gray-300`}
                                        >
                                            {`${i + 1}. ${option}`}
                                        </p>
                                    ))}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => editQuestion(index)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-1 px-3 shadow-md transition-transform transform hover:scale-105"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => removeQuestion(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-1 px-3 shadow-md transition-transform transform hover:scale-105"
                                    >
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateQuiz;
