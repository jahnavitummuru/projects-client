export interface Project {
  _id?: string;
  name: string;
  description: string;
  owner: string;
  stars: number;
  forks: number;
  languages: string;
  tags: string;
  contributors: string;
  created_at: Date;
}
