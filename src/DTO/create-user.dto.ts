export class CreateUserDto {
  readonly id: string;
  readonly groupId: string;
  readonly name: string;
  readonly surname: string;
  readonly role: string;
  readonly email: string;
  readonly pass: string;
  readonly phone: string;
  readonly photo: string;
}
