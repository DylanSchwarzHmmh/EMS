export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  skillSet: { id: number; skill: string }[];
}

export type CreateEmployee = Omit<Employee, 'id'>;

export type UpdateEmployee = Partial<CreateEmployee>;

