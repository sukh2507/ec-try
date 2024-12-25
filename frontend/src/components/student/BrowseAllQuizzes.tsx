import React, { useEffect, useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxios from "@/hooks/useAxios";

const BrowseAllQuizzes = () => {
    const axios = useAxios();

    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/student/test");
            setQuizzes(response.data.tests);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [axios]);

    const handleBuyQuiz = async (quizId) => {
        try {
            await axios.post(`/student/test/${quizId}`);
            alert("Quiz added to pending payments successfully!");
            await fetchQuizzes();
        } catch (err) {
            console.error("Error adding quiz to pending payments:", err);
            alert("Failed to add quiz to pending payments.");
        }
    };

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter((quiz) =>
            quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [quizzes, searchTerm]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                <style jsx>{`
                    .loader {
                        border-top-color: #3498db;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                Explore Quizzes
            </h1>

            <div className="flex justify-center mb-6">
                <Input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-lg p-3 text-lg rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                        <Card
                            key={quiz._id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <CardHeader className="p-4 bg-blue-50 rounded-t-lg">
                                <h2 className="text-xl font-semibold text-blue-700">
                                    {quiz.name}
                                </h2>
                            </CardHeader>
                            <CardContent className="p-4">
                                <p className="text-gray-700 mb-2">{quiz.description}</p>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Price: ${quiz.price}</span>
                                    <span>Time: {quiz.time}</span>
                                </div>
                                <p className="text-gray-500 mt-2 text-sm">
                                    Created By: {quiz.createdBy.userId.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Stream: {quiz.createdBy.stream}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 flex justify-end">
                                <Button
                                    onClick={() => handleBuyQuiz(quiz._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 hover:scale-105 transform transition-all duration-200"
                                >
                                    Buy Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-800 text-center col-span-full">
                        No quizzes found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BrowseAllQuizzes;
