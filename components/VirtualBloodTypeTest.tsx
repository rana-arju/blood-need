"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  {
    id: "q1",
    question: "What blood type are your parents?",
    options: [
      { value: "a", label: "Both O" },
      { value: "b", label: "One A, one O" },
      { value: "c", label: "One B, one O" },
      { value: "d", label: "Other combination" },
    ],
  },
  {
    id: "q2",
    question: "Do you have any siblings? If yes, what are their blood types?",
    options: [
      { value: "a", label: "No siblings" },
      { value: "b", label: "All siblings are type O" },
      { value: "c", label: "Siblings have different blood types" },
      { value: "d", label: "I don't know my siblings' blood types" },
    ],
  },
  {
    id: "q3",
    question: "Have you ever been told you have a rare blood type?",
    options: [
      { value: "a", label: "Yes" },
      { value: "b", label: "No" },
      { value: "c", label: "I'm not sure" },
    ],
  },
];

export default function VirtualBloodTypeTest() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    // This is a simplified logic for demonstration purposes
    // In a real application, you'd use a more sophisticated algorithm
    if (answers.q1 === "a" && answers.q2 === "b") {
      setResult("Your blood type is likely O");
    } else if (answers.q1 === "b") {
      setResult("Your blood type is likely A or O");
    } else if (answers.q1 === "c") {
      setResult("Your blood type is likely B or O");
    } else if (answers.q3 === "a") {
      setResult(
        "You might have a rare blood type. Please consult a medical professional for accurate testing."
      );
    } else {
      setResult(
        "Based on your answers, we can't determine your likely blood type. Please consult a medical professional for accurate testing."
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estimate Your Blood Type</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <Label>{q.question}</Label>
              <RadioGroup onValueChange={(value) => handleAnswer(q.id, value)}>
                {q.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${q.id}-${option.value}`}
                    />
                    <Label htmlFor={`${q.id}-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-primary/10 rounded-md">
            <p className="font-semibold">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
