export class CreateClientDto {
  readonly id: string;
  readonly email: string;
  readonly pass: string;
  readonly image: string;
  readonly name: string;
  readonly middlename: string;
  readonly surname: string;
  readonly age: string;
  readonly level: string;
  readonly color: string;
  readonly phone: string;
  readonly address: string;
  readonly tags: string[];
  readonly parents: {
    fullName: string;
    relative: string;
    name: string;
    middlename: string;
    surname: string;
    email: string;
    phone: string;
  }[];
}
