"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  Droplet,
  ArrowRight,
  ArrowLeft,
  Share2,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Question {
  id: number;
  text: string;
  options: string[];
}

export default function VirtualBloodTest() {
  const t = useTranslations("VirtualTest");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);


  // Initialize questions after component mounts to avoid hydration mismatch
  useEffect(() => {
    // Safely get options as arrays
    const getOptions = (key: string): string[] => {
      try {
        const options = t.raw(`options.${key}`);
        if (Array.isArray(options)) {
          return options;
        }
        // If it's not an array (like a string), return an empty array
        return [];
      } catch {
       
        return [];
      }
    };

    setQuestions([
      {
        id: 1,
        text: t("questions.ethnicity"),
        options: getOptions("ethnicity"),
      },
      {
        id: 2,
        text: t("questions.parents"),
        options: getOptions("parents"),
      },
      {
        id: 3,
        text: t("questions.antibodies"),
        options: getOptions("antibodies"),
      },
    ]);
  }, [t]);

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateBloodType(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  const handleOptionSelect = (value: string) => {
      

    setSelectedOption(value);
  };

  const calculateBloodType = (userAnswers: string[]) => {
    // This is a simplified example - in real world, use more sophisticated algorithm
    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    const result = bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
    setResult(result);
    setShowResult(true);
  };

  const getBloodTypeInfo = (bloodType: string | null): string => {
    if (!bloodType) return "";

    try {
      return t(
        `bloodTypes.${bloodType
          .replace("+", "Positive")
          .replace("-", "Negative")}`
      );
    } catch  {
     
      return "";
    }
  };

  // If questions aren't loaded yet, show a loading state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Droplet className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <Card className="p-8 border-t-4 border-t-primary">
              <div className="mb-8">
                <Progress
                  value={(currentQuestion / questions.length) * 100}
                  className="h-2"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {t("progress", {
                      current: currentQuestion + 1,
                      total: questions.length,
                    })}
                  </p>
                  <p className="text-sm font-medium">
                    {Math.round((currentQuestion / questions.length) * 100)}%
                  </p>
                </div>
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                    {questions[currentQuestion].text}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("tooltips.question")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <RadioGroup
                  value={selectedOption || ""}
                  onValueChange={handleOptionSelect}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        selectedOption === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      } transition-all duration-200 cursor-pointer`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("buttons.previous")}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="flex items-center"
                  >
                    {currentQuestion < questions.length - 1
                      ? t("buttons.next")
                      : t("buttons.finish")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="p-8 text-center border-t-4 border-t-primary">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {t("result.title")}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t("result.description")}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary mb-4">
                    <span className="text-5xl font-bold text-primary">
                      {result}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {getBloodTypeInfo(result)}
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground text-left">
                      {t("result.disclaimer")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.location.reload()}>
                    {t("result.retake")}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/donors" className="flex items-center">
                      {t("result.findMatch")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="flex items-center">
                    <Share2 className="mr-2 w-4 h-4" />
                    {t("result.share")}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
