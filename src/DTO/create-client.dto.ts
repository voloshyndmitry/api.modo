export class CreateClientDto {
  readonly id: string;
  readonly email: string;
  readonly pass?: string;
  readonly photo?: string;
  readonly name: string;
  readonly middlename?: string;
  readonly surname: string;
  readonly dob: string;
  readonly gender: string;
  readonly level?: string;
  readonly phone: string;
  readonly address: {
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    province: string;
    city: string;
    country: string;
  };
  readonly tags?: string[];
  readonly groups?: {
    day: string;
    time: string;
  }[];
  readonly relatives?: {
    relative: string;
    id: string;
  }[];
}
