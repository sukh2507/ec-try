import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizList from "./QuizList";
import { useNavigate } from "react-router-dom";


const MyQuizzesOverview = () => {
    const [view, setView] = useState("overview"); // Tracks the current view: overview, pending, or purchased
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const [purchasedQuizzes, setPurchasedQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Dummy data for pending and purchased quizzes
        const dummyPendingQuizzes = [
            { id: 1, title: "Math Quiz", description: "Test your math skills", price: 10 },
            { id: 2, title: "Science Quiz", description: "Explore scientific concepts", price: 15 },
        ];
        const dummyPurchasedQuizzes = [
            { id: 3, title: "History Quiz", description: "Dive into historical events", price: 12 },
            { id: 4, title: "Geography Quiz", description: "Learn about the world", price: 8 },
        ];
        setPendingQuizzes(dummyPendingQuizzes);
        setPurchasedQuizzes(dummyPurchasedQuizzes);
    }, []);

    const renderOverview = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pending Payment Card */}
            <Card
                className="bg-gray-100 dark:bg-black hover:cursor-pointer hover:shadow-md transition"
                onClick={() => setView("pending")}
            >
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        Pending Payment
                    </h2>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                        View and complete payment for your pending quizzes.
                    </p>
                </CardContent>
            </Card>

            {/* Purchased Quizzes Card */}
            <Card
                className="bg-gray-100 dark:bg-black hover:cursor-pointer hover:shadow-md transition"
                onClick={() => setView("purchased")}
            >
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        Purchased Quizzes
                    </h2>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                        Access and solve quizzes you have purchased.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderPendingQuizzes = () => (
        <div>
            <Button
                onClick={() => setView("overview")}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Back to Overview
            </Button>
            <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Pending Payment</h2>
            <QuizList
                quizzes={pendingQuizzes}
                onAction={(quiz) => console.log(`Proceeding to payment for quiz: ${quiz.id}`)}
                actionLabel="Pay Now"
                status="Pending"
            />
        </div>
    );

    const renderPurchasedQuizzes = () => (
        <div>
            <Button
                onClick={() => setView("overview")}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Back to Overview
            </Button>
            <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Purchased Quizzes</h2>
            <QuizList
                quizzes={purchasedQuizzes}
                onAction={() => navigate('/solve')}
                actionLabel="Solve Now"
                status="Purchased"
            />
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">My Quizzes</h1>
            {view === "overview" && renderOverview()}
            {view === "pending" && renderPendingQuizzes()}
            {view === "purchased" && renderPurchasedQuizzes()}
        </div>
    );
};

export default MyQuizzesOverview;
