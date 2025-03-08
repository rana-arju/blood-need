"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, X, Award, RefreshCw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const BloodDonationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "How often can a healthy person donate whole blood?",
      options: [
        "Every 2 weeks",
        "Every 8 weeks (56 days)",
        "Every 6 months",
        "Once a year",
      ],
      correctAnswer: 1,
      explanation:
        "A healthy donor may donate whole blood every 8 weeks (56 days). This allows enough time for the body to replenish the red blood cells that were donated.",
    },
    {
      id: 2,
      question: "Which blood type is considered the 'universal donor'?",
      options: ["A+", "AB+", "O-", "B-"],
      correctAnswer: 2,
      explanation:
        "O- blood is considered the universal donor because it can be given to anyone regardless of their blood type in emergency situations.",
    },
    {
      id: 3,
      question: "What is the minimum weight requirement for most blood donors?",
      options: [
        "40 kg (88 lbs)",
        "50 kg (110 lbs)",
        "60 kg (132 lbs)",
        "70 kg (154 lbs)",
      ],
      correctAnswer: 1,
      explanation:
        "In most countries, donors need to weigh at least 50 kg (110 lbs) to ensure they have enough blood volume for a safe donation.",
    },
    {
      id: 4,
      question:
        "How much blood is typically taken during a whole blood donation?",
      options: [
        "250 ml (about 1 cup)",
        "450-500 ml (about 1 pint)",
        "750 ml (about 3 cups)",
        "1 liter (about 4 cups)",
      ],
      correctAnswer: 1,
      explanation:
        "A typical whole blood donation is about 450-500 ml, or roughly one pint. This is about 10% of the total blood volume in an adult.",
    },
    {
      id: 5,
      question: "Which of these is NOT a major blood type in the ABO system?",
      options: ["A", "B", "C", "O"],
      correctAnswer: 2,
      explanation:
        "The ABO blood group system consists of A, B, AB, and O blood types. C is not a blood type in this system.",
    },
    {
      id: 6,
      question: "What component of blood helps with clotting?",
      options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      correctAnswer: 2,
      explanation:
        "Platelets are tiny cell fragments that help blood clot and prevent excessive bleeding when a blood vessel is damaged.",
    },
    {
      id: 7,
      question: "What should you do the day before donating blood?",
      options: [
        "Fast for 24 hours",
        "Drink plenty of water",
        "Exercise intensely",
        "Take aspirin",
      ],
      correctAnswer: 1,
      explanation:
        "It's important to stay well-hydrated before donating blood. Drinking plenty of water helps make veins more visible and blood easier to draw.",
    },
    {
      id: 8,
      question: "What is the minimum age to donate blood in most countries?",
      options: ["16 years", "17 years", "18 years", "21 years"],
      correctAnswer: 1,
      explanation:
        "In most countries, individuals must be at least 17 years old to donate blood, though some places allow 16-year-olds to donate with parental consent.",
    },
    {
      id: 9,
      question:
        "How long does the actual blood donation process take (needle in arm)?",
      options: [
        "2-3 minutes",
        "8-10 minutes",
        "20-30 minutes",
        "45-60 minutes",
      ],
      correctAnswer: 1,
      explanation:
        "The actual donation time (when the needle is in your arm) is typically 8-10 minutes for whole blood donation. The entire process including registration, screening, and recovery takes about an hour.",
    },
    {
      id: 10,
      question: "Which blood type is known as the 'universal recipient'?",
      options: ["O+", "O-", "AB+", "AB-"],
      correctAnswer: 2,
      explanation:
        "AB+ is known as the universal recipient because individuals with this blood type can receive blood from any ABO blood type, whether Rh-positive or Rh-negative.",
    },
  ];

  const handleOptionSelect = (index: number) => {
    if (!showAnswer) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null) {
      setShowAnswer(true);
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You're a blood donation expert!";
    if (percentage >= 70)
      return "Great job! You know a lot about blood donation.";
    if (percentage >= 50)
      return "Good effort! You have a basic understanding of blood donation.";
    return "Keep learning! There's more to know about blood donation.";
  };

  if (completed) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center relative">
              <span className="text-3xl font-bold text-primary">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <svg viewBox="0 0 100 100" className="absolute inset-0 rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary"
                  strokeDasharray={`${
                    (score / questions.length) * 251.2
                  } 251.2`}
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium mb-2">{getScoreMessage()}</p>
            <p className="text-muted-foreground">
              Your knowledge about blood donation can help save lives. Share
              what you've learned with friends and family!
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-primary" />
              Why This Matters
            </h3>
            <p className="text-sm text-muted-foreground">
              Understanding blood donation helps you become a better donor and
              can encourage others to donate. Every donation can save up to 3
              lives, and educated donors are more likely to return regularly.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full gap-2">
            <RefreshCw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">Score: {score}</span>
        </div>
        <Progress
          value={((currentQuestion + 1) / questions.length) * 100}
          className="h-2"
        />
        <CardTitle className="mt-4">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption?.toString()} className="space-y-3">
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                showAnswer
                  ? index === currentQ.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : selectedOption === index
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-border"
                  : selectedOption === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={showAnswer}
                className={
                  showAnswer && index === currentQ.correctAnswer
                    ? "text-green-500"
                    : ""
                }
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-grow cursor-pointer"
              >
                {option}
              </Label>
              {showAnswer &&
                (index === currentQ.correctAnswer ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : selectedOption === index ? (
                  <X className="h-5 w-5 text-red-500" />
                ) : null)}
            </div>
          ))}
        </RadioGroup>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted/30 rounded-lg"
          >
            <h3 className="font-medium mb-1">Explanation:</h3>
            <p className="text-sm text-muted-foreground">
              {currentQ.explanation}
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {!showAnswer ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BloodDonationQuiz;
