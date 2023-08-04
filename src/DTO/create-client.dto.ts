import { MetaData } from "../Common/common.interfaces";

export class CreateClientDto {
  readonly id: string;
  readonly groupId: string;
  readonly email: string;
  readonly isVisible: boolean;
  readonly pass?: string;
  readonly photo?: string;
  readonly name: string;
  readonly middlename?: string;
  readonly surname: string;
  readonly dob: string;
  readonly gender: string;
  readonly level?: string;
  readonly phone: string;
  readonly isStudent: boolean;
  readonly sportType: string;
  readonly isApproved: boolean;
  readonly address: {
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    province: string;
    city: string;
    country: string;
  };
  readonly tags?: string[];
  readonly groups?: string[];
  readonly relatives?: {
    relative: string;
    id: string;
  }[];
  readonly paymentOption: string;
  readonly memberships: string[];
  readonly status: string;
  readonly medicalBehavioralInfo: string;
  readonly created: MetaData;
  readonly updated: MetaData;
  readonly price: number;
}
