import { User } from './user';

export type Project = {
  id: number;
  name: string;
  description: string;
  categories: string[] | null;
  user_id: User['id'];
  user: User;
  counts: Record<string, number>;
  created_at: string;
  updated_at: string;
};
