import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizList = ({ quizzes, onAction, actionLabel, status }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Card
                        key={quiz.id}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all transform"
                    >
                        <CardHeader>
                            <h2 className="text-lg font-semibold text-white">{quiz.name}</h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white opacity-80">{quiz.description}</p>
                            <p className="text-white opacity-90 mt-2">Price: ${quiz.price}</p>
                            <p className="text-white opacity-90 mt-2">Time: {quiz.time} mins</p>
                            <p className="text-white opacity-80 mt-2">Created By: {quiz.createdBy.userId.name}</p>
                            <p className="text-white opacity-80 mt-2">Stream: {quiz.createdBy.stream}</p>
                            {status && (
                                <p className="text-white opacity-70 mt-2">Status: {status}</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => onAction(quiz)}
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6 py-3 transition-all"
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
