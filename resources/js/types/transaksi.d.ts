import { Media } from '.';
import { Project } from './project';

export type Transaksi = {
  id: number;
  name: string;
  date: string;
  type: string;
  price: number;
  tags: string[];
  media: Media[];
  project_id: Project['id'];
  project: Project;
  description: string;
  created_at: string;
  updated_at: string;
};
