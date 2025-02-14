"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const resources = [
  {
    id: 1,
    title: "Blood Donation 101",
    content:
      "Learn about the basics of blood donation, including eligibility criteria and the donation process.",
  },
  {
    id: 2,
    title: "Blood Types Explained",
    content:
      "Understand different blood types and their compatibility for transfusions.",
  },
  {
    id: 3,
    title: "Preparing for Your Donation",
    content:
      "Tips on how to prepare for your blood donation to ensure a smooth and comfortable experience.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the most common blood type?",
    options: ["A+", "B+", "O+", "AB+"],
    correctAnswer: "O+",
  },
  {
    id: 2,
    question: "How often can a healthy adult donate blood?",
    options: ["Every week", "Every month", "Every 8 weeks", "Every 6 months"],
    correctAnswer: "Every 8 weeks",
  },
  {
    id: 3,
    question: "Which of these is NOT a major blood type?",
    options: ["A", "B", "C", "O"],
    correctAnswer: "C",
  },
];

export default function EducationalResources() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Learn About Blood Donation
        </h2>
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resources">Educational Resources</TabsTrigger>
            <TabsTrigger value="quiz">Blood Donation Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{resource.content}</p>
                    <Button className="mt-4">Read More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Test Your Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                {!quizCompleted ? (
                  <>
                    <h3 className="text-xl font-semibold mb-4">
                      Question {currentQuestionIndex + 1} of{" "}
                      {quizQuestions.length}
                    </h3>
                    <p className="mb-4">
                      {quizQuestions[currentQuestionIndex].question}
                    </p>
                    <div className="space-y-2">
                      {quizQuestions[currentQuestionIndex].options.map(
                        (option) => (
                          <Button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="w-full justify-start text-left"
                          >
                            {option}
                          </Button>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">
                      Quiz Completed!
                    </h3>
                    <p className="text-xl mb-4">
                      Your score: {score} out of {quizQuestions.length}
                    </p>
                    <Button onClick={resetQuiz}>Take Quiz Again</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
