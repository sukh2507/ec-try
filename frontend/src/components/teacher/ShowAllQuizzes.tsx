import React, { useState, useEffect } from 'react'
import AllQuizzes from "./AllQuizzes";
import EditQuiz from "./EditQuiz";
import useAxios from '@/hooks/useAxios';



const ShowAllQuizzes = () => {

    const axios = useAxios();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch quizzes
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/teacher/test");
                setQuizzes(response.data.tests);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [axios]); // Empty dependency array to run only once on component mount



    const [editingQuiz, setEditingQuiz] = useState(null);

    const handleEdit = (quiz) => {
        setEditingQuiz(quiz);
    };

    const handleDelete = (index) => {
        const updatedQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(updatedQuizzes);
        alert("Quiz deleted successfully.");
    };

    const handleSave = async (updatedQuiz) => {
        try {
            axios.put( `/teacher/test/${updatedQuiz._id}`,updatedQuiz)
            const updatedQuizzes = quizzes.map((quiz) =>
                quiz._id === updatedQuiz._id ? updatedQuiz : quiz
            );
            setQuizzes(updatedQuizzes);

        } catch (error) {
            console.log(error)
        }
        finally {

            setEditingQuiz(null); // Exit editing mode
        }
    };

    if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading quizzes...</p>;
    if (error) return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;

    return (
        <div>
            {editingQuiz ? (
                <EditQuiz quizToEdit={editingQuiz} onSave={handleSave} />
            ) : (
                <AllQuizzes quizzes={quizzes} onDelete={handleDelete} onEdit={handleEdit} />
            )}
        </div>
    )
}

export default ShowAllQuizzes;