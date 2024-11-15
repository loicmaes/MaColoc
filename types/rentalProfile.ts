import type {
  TDayMoment,
  TDiet,
  TFrequency,
  THistoryStatus,
  TJobStatus,
  TLanguage,
  TMaritalStatus,
} from "~/types/generics/enums";
import type { IUser } from "~/types/user";

export interface IRentalProfile {
  userUid: string;
  animals: boolean;
  smoker: TFrequency;
  drinker: TFrequency;
  maritalStatus: TMaritalStatus;
  jobStatus: TJobStatus;
  monthlyIncome: number;
  diet: TDiet;
  availability: TDayMoment;
  driverLicense: boolean;
  car: boolean;
  motorcycle: boolean;
  rentHistory: THistoryStatus;
  languages: TLanguage[];
  createdAt: Date;
  updatedAt: Date;
}
export type IIncludedRentalProfile = Omit<IRentalProfile, "userUid">;
export interface IRichRentalProfile extends IRentalProfile {
  user: IUser;
}

export interface ICreateRentalProfile {
  animals: boolean;
  smoker: TFrequency;
  drinker: TFrequency;
  maritalStatus: TMaritalStatus;
  jobStatus: TJobStatus;
  monthlyIncome: number;
  diet: TDiet;
  availability: TDayMoment;
  driverLicense: boolean;
  car: boolean;
  motorcycle: boolean;
  rentHistory: THistoryStatus;
  languages: TLanguage[];
}
