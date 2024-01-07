export interface User {
  id?: string;
  usertoken?: string;
  email?: string;
  pass?: string;
  name?: string;
  surname?: string;
  phone?: string;
  role?: string;
  photo?: string;
}
export interface BaseClient {
  id?: string;
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  phone: string;
  gender?: string;
  photo?: string;
  address?: Address;
  medicalBehavioralInfo?: string;
  paymentNotes?: string;
  paymentOption?: string;
  price?: number;
  memberships?: string[];
  groups?: string[];
  level?: string;
  status?: string;
  isStudent?: boolean;
  isApproved?: boolean;
  created?: MetaData;
  updated?: MetaData;
}

export interface Client extends BaseClient {
  dob?: string; // Should be mapped to model
  relatives?: any; // Should be mapped to model
}

export interface ClientView extends BaseClient {
  dob?: Date; // Should be mapped to view
  age?: number; // Just for UI
  relatives?: any; // Should be mapped to view
  //createdDate?: Date; // Just for UI
}

export interface Relative {
  relative: string;
  id?: string;
}

export interface RelativeView extends ClientView {
  relative: string;
}

export interface Address {
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  province: string;
  city: string;
  country: string;
}

interface Group {
  day: string;
  time: string;
}

interface Level {
  value: string;
  label: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  type: string;
  title: string;
  description: string;
  clientId: string;
  date: string | Date;
  created?: MetaData;
  updated?: MetaData;
}

export interface MembershipType {
  id?: string;
  value: string; // title
  label: string; // description
  price: number;
  currency: string;
  specialOffers?: Offer;
  created?: MetaData;
  updated?: MetaData;
}

export interface Product {
  id?: string;
  value: string; // title
  label: string; // description
  brand?: string;
  size?: string;
  color?: DropDown;
  salePrice?: number;
  price: number;
  currency: string;
  specialOffers?: Offer;
  created?: MetaData;
  updated?: MetaData;
}

interface Offer {
  title: string;
  description: string;
  price: string;
}

interface Email {
  email: string;
  html: string;
  subject: string;
}

export interface UserEvent {
  id?: string;
  day: string;
  title: string;
  groupId: string;
  endTime: Time;
  startTime: Time;
  created?: MetaData;
  updated?: MetaData;
}

export interface Visit {
  id?: string;
  eventId: string;
  date: string;
  clientsIds: string[];
}

export interface MetaData {
  date: string;
  userId: string;
}

export interface Time {
  h: number;
  m: number;
}

export interface DateObject {
  year: number;
  month: number;
  day: number;
}

export interface Response {
  error: string;
}

export interface DropDown {
  label: string;
  value: string;
}

export interface Analytic {
  id: string;
  groupId: string;
  ua: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    vendor: string;
    model: string;
  };
  cpu: any;
  location: {
    range: number[];
    country: string;
    region: string;
    eu: string;
    timezone: string;
    city: string;
    ll: number[];
    metro: number;
    area: number;
  };
  ip: string;
  created: MetaData;
}

export interface EmailTemplate {
  name: string;
  details: string;
  description: string;
  config: EmailTemplateConfig;
  id?: string;
  created?: MetaData;
  updated?: MetaData;
}

export interface EmailTemplateConfig {
  subject: string;
  email: string;
  html: string;
}
