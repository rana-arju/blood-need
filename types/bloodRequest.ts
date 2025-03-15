export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  blood?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DonorInfo {
  id: string;
  userId: string;
  phone: string;
  whatsappNumber?: string;
  facebookId?: string;
  emergencyContact: string;
  height?: number;
  weight?: number;
  medicalCondition?: string;
  currentMedications?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface InterestedUser {
  id: string;
  name: string;
  image?: string;
  blood: string;
  donorInfo: DonorInfo | null;
}

export interface BloodRequest {
  id: string;
  userId: string;
  patientName: string;
  blood: string;
  hospitalName: string;
  contactNumber: string;
  whatsappNumber?: string;
  bloodAmount: number;
  division: string;
  district: string;
  upazila: string;
  address: string;
  requiredDate: Date | string;
  requireTime: Date | string;
  hemoglobin?: number;
  patientProblem?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  user?: User;
}

export interface BloodRequestResponse {
  bloodRequest: BloodRequest;
  interestedUsers: InterestedUser[];
}
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  blood?: string;
  gender?: string;
  dateOfBirth?: Date | string;
  division?: string;
  district?: string;
  upazila?: string;
  address?: string;
  lastDonationDate?: Date | string;
  donationCount?: number;
  rewardBadge?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DonorInfo {
  id: string;
  userId: string;
  phone: string;
  whatsappNumber?: string;
  facebookId?: string;
  emergencyContact: string;
  height?: number;
  weight?: number;
  medicalCondition?: string;
  currentMedications?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Donation {
  id: string;
  userId: string;
  bloodRequestId: string;
  status: string;
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}



export interface InterestedDonorDetails {
  user: User;
  donorInfo: DonorInfo | null;
  donation: Donation;
}

export interface BloodRequest {
  id: string;
  userId: string;
  patientName: string;
  blood: string;
  hospitalName: string;
  contactNumber: string;
  whatsappNumber?: string;
  bloodAmount: number;
  division: string;
  district: string;
  upazila: string;
  address: string;
  requiredDate: Date | string;
  requireTime: Date | string;
  hemoglobin?: number;
  patientProblem?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  user?: User;
}

export interface BloodRequestResponse {
  bloodRequest: BloodRequest;
  interestedUsers: InterestedUser[];
}
