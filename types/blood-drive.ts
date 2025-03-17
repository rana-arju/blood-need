export interface IBloodDrive {
  id: string;
  title: string;
  userId: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  organizer: string;
  date: Date;
  banner?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string;
    email: string;
  };
}

export interface IBloodDriveFilters {
  searchTerm?: string;
  organizer?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IBloodDriveFormData {
  title: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  organizer: string;
  date: string;
  banner?: string;
}
