"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";
import { divisions, districts, upazilas } from "@/data/locations";
import { formSchema } from "@/lib/schemas";

const VoiceBloodRequestForm: React.FC<{
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}> = ({ onSubmit }) => {
  const [currentField, setCurrentField] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      blood: "A+",
      division: "",
      district: "",
      upazila: "",
      address: "",
      hospitalName: "",
      contactNumber: "",
      whatsappNumber: "",
      patientProblem: "",
      bloodAmount: 1,
      requiredDate: new Date(),
      requireTime: new Date(),
      hemoglobin: 1,
    },
  });

  const fields = [
    { name: "patientName", prompt: "Please say the patient's name" },
    { name: "blood", prompt: "Please say the blood group" },
    { name: "division", prompt: "Please say the division name" },
    { name: "district", prompt: "Please say the district name" },
    { name: "upazila", prompt: "Please say the upazila name" },
    { name: "address", prompt: "Please say the address" },
    { name: "hospitalName", prompt: "Please say the hospital name" },
    { name: "contactNumber", prompt: "Please say the contact number" },
    { name: "whatsappNumber", prompt: "Please say the WhatsApp number" },
    { name: "patientProblem", prompt: "Please describe the patient's problem" },
    { name: "bloodAmount", prompt: "Please say the required amount of blood" },
    { name: "requiredDate", prompt: "Please say the required date for blood" },
    { name: "requireTime", prompt: "Please say the required time for blood" },
    { name: "hemoglobin", prompt: "Please say the hemoglobin level" },
  ];

  const speakPrompt = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript && !listening) {
      const field = fields[currentField];
      let value = transcript;

      if (field.name === "blood") {
        value = mapBloodGroup(transcript);
      } else if (field.name === "division") {
        value = mapLocation(transcript, divisions);
      } else if (field.name === "district") {
        value = mapLocation(transcript, districts);
      } else if (field.name === "upazila") {
        value = mapLocation(transcript, upazilas);
      } else if (field.name === "bloodAmount") {
        value = extractNumber(transcript).toString();
      } else if (
        field.name === "requiredDate" ||
        field.name === "requireTime"
      ) {
        value = parseDate(transcript);
      }

      form.setValue(field.name as any, value);
      resetTranscript();

      if (currentField < fields.length - 1) {
        setCurrentField((prev) => prev + 1);
        speakPrompt(fields[currentField + 1].prompt);
      } else {
        speakPrompt("Form is complete. Do you want to submit?");
      }
    }
  }, [transcript, listening, currentField, resetTranscript, form, speakPrompt]);

  const handleListen = useCallback(() => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    speakPrompt(fields[currentField].prompt);
  }, [currentField, fields, speakPrompt]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  }, []);

  const handleSubmit = useCallback(() => {
    const data = form.getValues();
    onSubmit(data);
  }, [form, onSubmit]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Voice-Controlled Blood Request Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium">{fields[currentField].prompt}</p>
          <Button
            type="button"
            onClick={isListening ? stopListening : handleListen}
            className={`w-full ${
              isListening
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isListening ? (
              <MicOff className="mr-2" />
            ) : (
              <Mic className="mr-2" />
            )}
            {isListening ? "Stop Listening" : "Start Listening"}
          </Button>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Current Input:</h3>
          <p>{form.getValues(fields[currentField].name as any) || ""}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Form Preview:</h3>
          {fields.map((field) => (
            <p key={field.name}>{`${field.prompt}: ${
              form.getValues(field.name as any) || ""
            }`}</p>
          ))}
        </div>
        {currentField === fields.length - 1 && (
          <Button onClick={handleSubmit} className="w-full mt-4">
            Submit
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceBloodRequestForm;

// Helper functions

function mapBloodGroup(input: string): string {
  const bloodGroupMap: { [key: string]: string } = {
    "a positive": "A+",
    "a negative": "A-",
    "b positive": "B+",
    "b negative": "B-",
    "ab positive": "AB+",
    "ab negative": "AB-",
    "o positive": "O+",
    "o negative": "O-",
  };
  return bloodGroupMap[input.toLowerCase()] || input;
}

function mapLocation(input: string, locations: any[]): string {
  const location = locations.find(
    (loc) => loc.en_name.toLowerCase() === input.toLowerCase()
  );
  return location ? location.id : input;
}

function extractNumber(input: string): number {
  const match = input.match(/\d+/);
  return match ? Number.parseInt(match[0]) : 1;
}

function parseDate(input: string): string {
  const date = new Date(input);
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}
