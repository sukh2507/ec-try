import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const QuizList = ({ quizzes, onAction, actionLabel, status }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Card key={quiz.id} className="bg-gray-100 dark:bg-black">
                        <CardHeader>
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                {quiz.title}
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">{quiz.description}</p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Price: ${quiz.price}</p>
                            {status && (
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Status: {status}</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => onAction(quiz)}
                                className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                {actionLabel}
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p className="text-gray-800 dark:text-white">No quizzes found.</p>
            )}
        </div>
    );
};

export default QuizList;
