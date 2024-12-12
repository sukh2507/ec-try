import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface QuestionFormProps {
    onSave: (question: any) => void;
    onCancel: () => void;
    existingQuestion?: any;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSave, onCancel, existingQuestion }) => {
    const [question, setQuestion] = useState(existingQuestion || { title: "", options: ["", "", "", ""], solution: null });

    const updateOption = (index: number, value: string) => {
        const updatedOptions = [...question.options];
        updatedOptions[index] = value;
        setQuestion({ ...question, options: updatedOptions });
    };

    return (
        <Card className="p-6 bg-gray-100 dark:bg-black">
            <CardHeader>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Question</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Enter question</label>
                    <Input
                        value={question.title}
                        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                        placeholder="Enter question"
                        className="bg-white dark:bg-black text-gray-800 dark:text-white"
                    />
                </div>
                {question.options.map((option: string, index: number) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">
                            Option {index + 1}
                        </label>
                        <Input
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Enter option ${index + 1}`}
                            className="bg-white dark:bg-black text-gray-800 dark:text-white"
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correct Option</label>
                    <Input
                        type="number"
                        value={question.solution}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value >= 1 && value <= 4) {
                                setQuestion({ ...question, solution: value - 1 });
                            }
                        }}
                        placeholder="Enter correct option number"
                        min={1}
                        max={4}
                        className="bg-white dark:bg-black text-gray-800 dark:text-white"
                    />
                </div>

            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button
                    onClick={onCancel}
                    className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onSave(question)}
                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QuestionForm;
