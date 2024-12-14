import React, { useState, useEffect } from "react";

const QuizSolvingPage = () => {
    const [timer, setTimer] = useState(10800); // Example: 3 hours in seconds
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionStatus, setQuestionStatus] = useState(
        Array(10).fill("notVisited") // Example: 10 questions
    );

    // Handle Fullscreen on mount
    useEffect(() => {
        document.documentElement.requestFullscreen();
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            // Handle time expiration
            alert("Time's up! Submitting quiz...");
            handleSubmitQuiz();
        }
    }, [timer]);

    // Format timer for display
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleNavigation = (direction) => {
        const newQuestion =
            direction === "next"
                ? Math.min(currentQuestion + 1, questionStatus.length)
                : Math.max(currentQuestion - 1, 1);
        setCurrentQuestion(newQuestion);
    };

    const handleQuestionSelect = (index) => {
        setCurrentQuestion(index + 1);
    };

    const handleMarkForReview = () => {
        updateQuestionStatus("markedForReview");
        handleNavigation("next");
    };

    const handleSaveAndNext = () => {
        updateQuestionStatus("answered");
        handleNavigation("next");
    };

    const handleClearResponse = () => {
        updateQuestionStatus("notAnswered");
    };

    const updateQuestionStatus = (status) => {
        setQuestionStatus((prev) => {
            const updated = [...prev];
            updated[currentQuestion - 1] = status;
            return updated;
        });
    };

    const handleSubmitQuiz = () => {
        console.log("Submitting quiz...");
        // Add submission logic
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {/* Timer and Candidate Info */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Examchamp</h1>
                <div>
                    <p>Candidate Name: John Doe</p>
                    <p>Roll Number: 123456</p>
                    <p>Time Remaining: {formatTime(timer)}</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {/* Question Content */}
                <div className="col-span-3 bg-gray-800 p-4 rounded">
                    <h2 className="text-lg font-bold mb-2">Question {currentQuestion}:</h2>
                    <p className="mb-4">What are the 4 pillars of OOP?</p>
                    <div className="space-y-2">
                        {["xyz", "abz", "ard", "wrd"].map((option, idx) => (
                            <label key={idx} className="block">
                                <input type="radio" name="answer" className="mr-2" />
                                {option}
                            </label>
                        ))}
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
                </div>

                {/* Question Palette */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="font-bold mb-2">Question Palette</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {questionStatus.map((status, idx) => (
                            <button
                                key={idx}
                                className={`w-10 h-10 rounded ${status === "notVisited"
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
        </div>
    );
};

export default QuizSolvingPage;
