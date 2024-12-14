import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";

const BrowseAllQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dummy data for quizzes
        const dummyQuizzes = [
            { id: 1, title: "Math Quiz", description: "Test your math skills", price: 10 },
            { id: 2, title: "Science Quiz", description: "Explore scientific concepts", price: 15 },
            { id: 3, title: "History Quiz", description: "Dive into historical events", price: 12 },
            { id: 4, title: "Geography Quiz", description: "Learn about the world", price: 8 },
        ];
        setQuizzes(dummyQuizzes);
        setLoading(false);
    }, []);

    const handleBuyQuiz = (quiz) => {
        // Move quiz to the payment page (you can navigate to the payment page and pass quiz data)
        console.log(`Navigating to payment page for quiz ${quiz.id}`);

        // After payment, add the quiz to the pending payment section in "My Quizzes"
        // This would typically involve updating the server or context state
        const pendingPaymentQuiz = { ...quiz, status: "pending" };
        console.log(`Quiz added to pending payment:`, pendingPaymentQuiz);
    };

    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Browse Quizzes</h1>

            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                        <Card key={quiz.id} className="bg-gray-100 dark:bg-black">
                            <CardHeader>
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    {quiz.title}
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300">{quiz.description}</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Price: ${quiz.price}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    onClick={() => handleBuyQuiz(quiz)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Buy
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-white">No quizzes found.</p>
                )}
            </div>
        </div>
    );
};

export default BrowseAllQuizzes;
