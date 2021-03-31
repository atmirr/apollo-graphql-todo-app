export interface TaskFieldType {
  id: number;
  title: string;
  completed: boolean;
  parent_id: number;
  __typename: string;
}

export interface TaskType {
  id: number;
  title: string;
  completed: boolean;
}

export interface RefType {
  __ref: string;
}
