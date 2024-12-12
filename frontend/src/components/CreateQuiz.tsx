import React, { useState } from "react";
import QuestionForm from "./QuestionForm"; // Assuming this component is in the same directory
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({
        name: "",
        description: "",
        price: "",
        questions: [],
    });
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

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
        <div className="flex gap-6 p-6 bg-white dark:bg-black text-gray-800 dark:text-white">
            {/* Left Section */}
            <div className="flex flex-col w-1/2 gap-4">
                {/* Quiz Details */}
                <Card className="p-6 bg-gray-100 dark:bg-black">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-white">Create Quiz</CardTitle>
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
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                            <Input
                                value={quiz.description}
                                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                placeholder="Enter quiz description"
                                className="bg-white dark:bg-black text-gray-800 dark:text-white"
                            />
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
                        className="bg-blue-500 hover:bg-blue-600 text-white mt-4 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Add Question
                    </Button>
                )}
            </div>

            {/* Right Section */}
            <div className="w-1/2 space-y-4">
                <Card className="p-6 bg-gray-100 dark:bg-black">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-white">Added Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {quiz.questions.length === 0 && <p className="text-gray-500 dark:text-gray-400">No questions added yet.</p>}
                        {quiz.questions.map((q, index) => (
                            <Card key={index} className="shadow-md bg-white dark:bg-black">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 dark:text-white">{`Q${index + 1}: ${q.title}`}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {q.options.map((option: string, i: number) => (
                                        <p
                                            key={i}
                                            className={`${q.solution === i ? "font-bold text-blue-600 dark:text-blue-400" : ""} text-gray-800 dark:text-gray-300`}
                                        >
                                            {`${i}. ${option}`}
                                        </p>
                                    ))}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => editQuestion(index)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => removeQuestion(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
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
