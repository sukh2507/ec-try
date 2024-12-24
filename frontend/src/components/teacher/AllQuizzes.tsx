import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AllQuizzes = ({ quizzes, onDelete, onEdit }) => {
    const navigate = useNavigate();
    return (
        <div className="p-6 bg-white dark:bg-black text-gray-800 dark:text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Quizzes</h1>
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() => navigate('/teacher/create-quiz')}
                >
                    Create New Quiz
                </Button>
            </div>

            {quizzes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No quizzes available. Create one to get started!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <Card key={quiz._id} className="bg-gray-100 dark:bg-black shadow-md">
                            <CardHeader>
                                <CardTitle className="text-gray-800 dark:text-white">
                                    {quiz.name || "Untitled Quiz"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300">{quiz.description || "No description provided."}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Price: ${quiz.price || "Free"}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Questions: {quiz.questions.length}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {quiz.time} mins</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Status: {quiz.isVerified ? 'Approved ✅' : 'Approved ❌'}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button
                                    onClick={() => onEdit(quiz)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"
                                >
                                    Edit
                                </Button>
                                {/* <Button
                                    onClick={() => onDelete(quiz)}
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

export default AllQuizzes;
