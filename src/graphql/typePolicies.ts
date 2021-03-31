import { Reference, makeVar, TypePolicies } from '@apollo/client';

export const errorVar = makeVar('');

const sortTasks = (
  tasks: Reference[] = [],
  readField: (field: string, ref: Reference) => number,
) =>
  tasks?.sort(
    (a: Reference, b: Reference) =>
      Number(readField('id', b)) - Number(readField('id', a)),
  );

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      readMainTasks(_, { readField }) {
        const tasks = readField<[]>('tasks');
        const mainTasks = tasks?.filter((taskRef) => {
          const taskParentId = readField('parent_id', taskRef);
          return taskParentId === null;
        });
        return sortTasks(mainTasks, readField);
      },
      readSubTasks(_, { variables, readField }) {
        const tasks = readField<[]>('tasks');
        const subTasks = tasks?.filter((taskRef) => {
          const taskParentId = readField('parent_id', taskRef);
          return taskParentId === variables?.parent_id;
        });
        return sortTasks(subTasks, readField);
      },
      error() {
        return errorVar();
      },
    },
  },
};
