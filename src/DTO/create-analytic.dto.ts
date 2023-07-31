import { MetaData } from "../Common/common.interfaces";

export class CreateAnalyticDto {
  readonly id: string;
  readonly groupId: string;
  readonly ua: string;
  readonly browser: {
    name: string;
    version: string;
    major: string;
  };
  readonly engine: {
    name: string;
    version: string;
  };
  readonly os: {
    name: string;
    version: string;
  };
  readonly device: {
    vendor: string;
    model: string;
  };
  readonly cpu: any;
  readonly location: {
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
  readonly ip: string;
  readonly created: MetaData;
}
