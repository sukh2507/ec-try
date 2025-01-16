import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizList from "./QuizList";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import userHoook from "@/context/User/UserHook";



const MyQuizzesOverview = () => {
    const user = userHoook();
    console.log(user.user);
    const axios = useAxios();
    const [view, setView] = useState("overview"); // Tracks the current view: overview, pending, or purchased
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const [purchasedQuizzes, setPurchasedQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const pendingResponse = await axios.get(`${import.meta.env.VITE_Backend_url}/student/test/query?paid=0`);
                setPendingQuizzes(pendingResponse.data.tests);

                const purchasedResponse = await axios.get(`${import.meta.env.VITE_Backend_url}/student/test/query?paid=1`);
                setPurchasedQuizzes(purchasedResponse.data.tests);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
            }
        };

        fetchQuizzes();
    }, [axios]);

    const renderOverview = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pending Payment Card */}
            <Card
                className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform"
                onClick={() => setView("pending")}
            >
                <CardHeader>
                    <h2 className="text-xl font-semibold text-white">Pending Payment</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-white opacity-80">
                        View and complete payment for your pending quizzes.
                    </p>
                </CardContent>
            </Card>

            {/* Purchased Quizzes Card */}
            <Card
                className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform"
                onClick={() => setView("purchased")}
            >
                <CardHeader>
                    <h2 className="text-xl font-semibold text-white">Purchased Quizzes</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-white opacity-80">
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
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md px-6 py-3 transition-all"
            >
                Back to Overview
            </Button>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Pending Payment</h2>
            <QuizList
                quizzes={pendingQuizzes}
                onAction={(quiz) => {
                    // console.log("Pay now for quiz:", quiz);
                    const studentId = user.user._id;
                    // Replace with the actual student ID
                    const whatsappLink = `https://wa.me/923059119149?text=${encodeURIComponent(
                        `Student ID: ${studentId}\nStudent Name: ${user.user.name} \nStudent email: ${user.user.email}\nQuiz Name: ${quiz.name}\nQuiz ID: ${quiz._id}`
                    )}`;
                    window.open(whatsappLink, "_blank");
                }}
                actionLabel="Pay Now"
                status="Pending"
            />
        </div>
    );

    const renderPurchasedQuizzes = () => (
        <div>
            <Button
                onClick={() => setView("overview")}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md px-6 py-3 transition-all"
            >
                Back to Overview
            </Button>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Purchased Quizzes</h2>
            <QuizList
                quizzes={purchasedQuizzes}
                onAction={(quiz) => {
                    // Navigate to /solve page with the quiz ID
                    navigate(`/solve/${quiz._id}`);
                }}
                actionLabel="Solve Now"
                status="Purchased"
            />
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
                My Quizzes
            </h1>
            {view === "overview" && renderOverview()}
            {view === "pending" && renderPendingQuizzes()}
            {view === "purchased" && renderPurchasedQuizzes()}
        </div>
    );
};

export default MyQuizzesOverview;
