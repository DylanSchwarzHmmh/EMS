export interface Skill {
  id: number;
  skill: string;
}

export interface Employee {
  id: number;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: Skill[];
}

export interface CreateEmployee {
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[];
}

export type UpdateEmployee = Partial<CreateEmployee>;

