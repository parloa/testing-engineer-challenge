export enum Industry {
  finance = "finance",
  tech = "tech",
  insurance = "insurance",
  travel = "travel",
  marketing = "marketing",
}

interface Project {
  id: string;
  name: string;
  contact: string;
  startDate: Date;
  endDate: Date;
}

export interface Customer {
  id: string;
  isActive: boolean;
  company: string;
  project: Project[];
  about: string;
  industry: Industry;
}
