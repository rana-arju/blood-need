export interface DonorDetails {
  id: string;
  name: string;
  email: string;
  image?: string;
  blood?: string;
  gender?: string;
  donationOffer: any;
  dateOfBirth?: Date | null | string;
  lastDonationDate?: Date | string | null;
  createdAt: Date | string;

  // Blood donor specific information
  donorInfo: {
    userId: string;
    phone: string;
    whatsappNumber?: string;
    facebookId?: string;
    emergencyContact: string;
    height?: number;
    weight?: number;
    medicalCondition?: string;
    currentMedications?: string;
    totalDonations: number;
    lastDonationDate?: Date | string | null;
    createdAt: Date | string;
  };

  // Status in relation to this blood request
  requestStatus: {
    status: "pending" | "selected" | "confirmed" | "cancelled";
    updatedAt: Date | string;
  };
}
