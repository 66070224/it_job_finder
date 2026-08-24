import { User } from "./user.js";

export default interface Profile {
  uid: string;
  user: User;
  phone: string;
  birth_date: string;
  address: string;
  github_url?: string | null;
}
