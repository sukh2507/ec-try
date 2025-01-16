import { useState } from "react";
import QuestionForm from "../QuestionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const EditQuiz = ({ quizToEdit, onSave }) => {
    const [quiz, setQuiz] = useState(quizToEdit);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

    const handleSave = () => {
        onSave(quiz);
        // Redirect or handle after save logic here
    };

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

    return (
        <div className="flex gap-6 p-6">
            {/* Left Section */}
            <div className="flex flex-col w-1/2 gap-4">
                {/* Quiz Details */}
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Edit Quiz</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quiz Name</label>
                            <Input
                                value={quiz.name}
                                onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                                placeholder="Enter quiz name"
                                className="bg-white dark:bg-black text-gray-800 dark:text-white"
                            />
                            {!quiz.name && <p className="text-red-500 text-sm">Quiz name is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                            <Input
                                value={quiz.description}
                                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                placeholder="Enter quiz description"
                                className="bg-white dark:bg-black text-gray-800 dark:text-white"
                            />
                            {!quiz.description && <p className="text-red-500 text-sm">Description is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Price</label>
                            <Input
                                type="number"
                                value={quiz.price}
                                onChange={(e) => setQuiz({ ...quiz, price: e.target.value })}
                                placeholder="Enter quiz price"
                                className="bg-white dark:bg-black text-gray-800 dark:text-white"
                            />
                            {!quiz.price && <p className="text-red-500 text-sm">Price is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time (in minutes)</label>
                            <Input
                                type="number"
                                min={1}
                                max={180}
                                value={quiz.time}
                                onChange={(e) => setQuiz({ ...quiz, time: e.target.value })}
                                placeholder="Enter time in minutes (1-180)"
                                className="bg-white dark:bg-black text-gray-800 dark:text-white"
                            />
                            {(!quiz.time || quiz.time < 1 || quiz.time > 180) && (
                                <p className="text-red-500 text-sm">Time is required (between 1 and 180 minutes).</p>
                            )}
                        </div>
                    </CardContent>

                </Card>

                {/* Question Form */}
                {showQuestionForm && (
                    <QuestionForm
                        onSave={addQuestion}
                        onCancel={() => setShowQuestionForm(false)}
                        existingQuestion={editingQuestionIndex !== null ? quiz.questions[editingQuestionIndex] : null}
                    />
                )}
                {!showQuestionForm && (
                    <Button
                        onClick={() => setShowQuestionForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
                    >
                        Add Question
                    </Button>
                )}

                <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white mt-4"
                >
                    Save Quiz
                </Button>
            </div>

            {/* Right Section */}
            <div className="w-1/2 space-y-4">
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Added Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {quiz.questions.length === 0 && <p className="text-gray-500">No questions added yet.</p>}
                        {quiz.questions.map((q, index) => (
                            <Card key={index} className="shadow-md">
                                <CardHeader>
                                    <CardTitle>{`Q${index + 1}: ${q.title}`}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {q.options.map((option: string, i: number) => (
                                        <p key={i} className={`${q.solution === i ? "font-bold text-blue-600" : ""}`}>
                                            {`${i + 1}. ${option}`}
                                        </p>
                                    ))}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => editQuestion(index)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => removeQuestion(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
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

export default EditQuiz;
