
export interface MetaData {
    date: string;
    userId: string;
  }


export interface CustomRequest extends Request {
  user: { sub: string }
}