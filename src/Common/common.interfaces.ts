export interface MetaData {
  date: string;
  userId: string;
}

export interface CustomRequest extends Request {
  user: { sub: string };
}

export enum PAYMENT_STATUS {
  ACTIVE = "Active",
  PENDING = "Pending",
  NOT_ACTIVE = "Not Active",
  FAMILY_MEMBER = "Family member",
}
