export class CreateClientDto {
  readonly id: string;
  readonly email: string;
  readonly pass: string;
  readonly image: string;
  readonly name: string;
  readonly surname: string;
  readonly age: string;
  readonly level: string;
  readonly color: string;
  readonly phone: string;
  readonly address: string;
  readonly tags: string[];
  readonly parents: {
    type: string;
    fullName: string;
  }[];
}
