"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

const BloodTypeChart = () => {
  const [selectedDonor, setSelectedDonor] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(
    null
  );

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const compatibility: Record<string, string[]> = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"],
    "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  };

  const getTypeColor = (type: string) => {
    if (type.startsWith("A"))
      return "text-red-500 bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-900/30";
    if (type.startsWith("B"))
      return "text-blue-500 bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30";
    if (type.startsWith("AB"))
      return "text-purple-500 bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/30";
    return "text-green-500 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-900/30";
  };

  const canDonate = (donor: string, recipient: string) => {
    return compatibility[donor]?.includes(recipient) || false;
  };

  const handleDonorClick = (type: string) => {
    setSelectedDonor(type === selectedDonor ? null : type);
  };

  const handleRecipientClick = (type: string) => {
    setSelectedRecipient(type === selectedRecipient ? null : type);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-3 text-center">Donors</h3>
          <div className="grid grid-cols-2 gap-2">
            {bloodTypes.map((type) => (
              <button
                key={`donor-${type}`}
                className={`p-3 border rounded-lg font-bold text-center transition-colors ${getTypeColor(
                  type
                )} ${
                  selectedDonor === type
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                } ${
                  selectedRecipient && !canDonate(type, selectedRecipient)
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleDonorClick(type)}
              >
                {type}
                {selectedRecipient && (
                  <span className="block mt-2">
                    {canDonate(type, selectedRecipient) ? (
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-red-500" />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3 text-center">Recipients</h3>
          <div className="grid grid-cols-2 gap-2">
            {bloodTypes.map((type) => (
              <button
                key={`recipient-${type}`}
                className={`p-3 border rounded-lg font-bold text-center transition-colors ${getTypeColor(
                  type
                )} ${
                  selectedRecipient === type
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                } ${
                  selectedDonor && !canDonate(selectedDonor, type)
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleRecipientClick(type)}
              >
                {type}
                {selectedDonor && (
                  <span className="block mt-2">
                    {canDonate(selectedDonor, type) ? (
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-red-500" />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
        {selectedDonor && selectedRecipient ? (
          <p className="text-lg">
            <span
              className={`font-bold ${
                getTypeColor(selectedDonor).split(" ")[0]
              }`}
            >
              {selectedDonor}
            </span>{" "}
            can{" "}
            {canDonate(selectedDonor, selectedRecipient)
              ? "donate to"
              : "NOT donate to"}{" "}
            <span
              className={`font-bold ${
                getTypeColor(selectedRecipient).split(" ")[0]
              }`}
            >
              {selectedRecipient}
            </span>
          </p>
        ) : selectedDonor ? (
          <p>Select a recipient blood type to check compatibility</p>
        ) : selectedRecipient ? (
          <p>Select a donor blood type to check compatibility</p>
        ) : (
          <p>Select donor and recipient blood types to check compatibility</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-3 text-center">
          Full Compatibility Chart
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="border p-2">Donor ↓ / Recipient →</th>
                {bloodTypes.map((type) => (
                  <th
                    key={type}
                    className={`border p-2 ${getTypeColor(type).split(" ")[0]}`}
                  >
                    {type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloodTypes.map((donor) => (
                <tr key={donor} className="hover:bg-muted/30">
                  <td
                    className={`border p-2 font-medium ${
                      getTypeColor(donor).split(" ")[0]
                    }`}
                  >
                    {donor}
                  </td>
                  {bloodTypes.map((recipient) => (
                    <td key={`${donor}-${recipient}`} className="border p-2">
                      {canDonate(donor, recipient) ? (
                        <Check className="h-4 w-4 mx-auto text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mx-auto text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodTypeChart;
