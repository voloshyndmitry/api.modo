export interface MetaData {
  date: string;
  userId: string;
}

export interface CustomRequest extends Request {
  user: { sub: string };
}

export enum PAYMENT_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  NOT_ACTIVE = "not active",
  FAMILY_MEMBER = "family member",
}
