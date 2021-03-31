import React from 'react';
import { InMemoryCache } from '@apollo/client';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  findByText,
  queryByTestId,
  queryByText,
  queryAllByText,
  waitFor,
} from '@testing-library/react';
import { typePolicies } from 'src/graphql/typePolicies';
import tasks from 'src/mocks/data/tasks';
import updatedTask from 'src/mocks/data/createdTask';
import renderWithMocksGenerator from 'src/mocks/utils/render-with-mocks';
import tasksMock from 'src/mocks/responses/tasksMock';
import getMainTasksMock from 'src/mocks/responses/getMainTasksMock';
import deleteTaskMock, {
  mutationFn as deleteMutationFn,
} from 'src/mocks/responses/deleteTaskMock';
import markAsCompletedMock, {
  mutationFn as markAsCompletedMutationFn,
} from 'src/mocks/responses/markAsCompletedMock';
import markAsUncompletedMock, {
  mutationFn as markAsUncompletedMutationFn,
} from 'src/mocks/responses/markAsUncompletedMock';
import updateTaskMock, {
  mutationFn as updateTaskMutationFn,
} from 'src/mocks/responses/updateTaskMock';
import TasksList from '../index';

async function waitForElements(container) {
  expect(await findByText(container, tasks[0].title)).toBeVisible();
}

let renderWithMocks;
beforeEach(() => {
  // This way we always have a fresh version
  // of the MockedProvider's cache
  // and our test units wouldn't have the side effect
  const mockedCache = new InMemoryCache({ typePolicies });
  renderWithMocks = renderWithMocksGenerator(mockedCache);
});

describe('<TasksList />', () => {
  it('should renders the component', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
    ]);

    await waitForElements(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display all the title of the tasks', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
    ]);

    await waitForElements(container);
    expect(queryAllByText(container, tasks[0].title).length).toBe(1);
    expect(queryAllByText(container, tasks[1].title).length).toBe(1);
  });

  it('clicking on the delete button should delete the task', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
      deleteTaskMock,
    ]);

    await waitForElements(container);
    const taskId = tasks[0].id;
    const deleteButton = queryByTestId(container, `delete-${taskId}`);
    fireEvent.click(deleteButton);
    await waitFor(() => expect(deleteMutationFn).toHaveBeenCalled());
    expect(queryByTestId(container, `task-${taskId}`)).not.toBeInTheDocument();
  });

  it('clicking on the done button should mark the task as completed', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
      markAsCompletedMock,
    ]);

    await waitForElements(container);
    const taskId = tasks[0].id;
    const undoneButton = queryByTestId(container, `undone-${taskId}`);
    fireEvent.click(undoneButton);
    await waitFor(() => expect(markAsCompletedMutationFn).toHaveBeenCalled());
    expect(
      queryByTestId(container, `undone-${taskId}`),
    ).not.toBeInTheDocument();
    expect(queryByTestId(container, `done-${taskId}`)).toBeInTheDocument();
  });

  it('clicking on the undone button should mark the task as uncompleted', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
      markAsUncompletedMock,
    ]);

    await waitForElements(container);
    const taskId = tasks[1].id;
    const doneButton = queryByTestId(container, `done-${taskId}`);
    fireEvent.click(doneButton);
    await waitFor(() => expect(markAsUncompletedMutationFn).toHaveBeenCalled());
    expect(queryByTestId(container, `done-${taskId}`)).not.toBeInTheDocument();
    expect(queryByTestId(container, `undone-${taskId}`)).toBeInTheDocument();
  });

  it('edit the task and press save should change the title of the task', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
      updateTaskMock,
    ]);

    await waitForElements(container);
    const taskId = tasks[0].id;
    const editButton = queryByTestId(container, `edit-${taskId}`);
    fireEvent.click(editButton);
    const inputNode = container.querySelector('input');
    fireEvent.change(inputNode, { target: { value: updatedTask.title } });
    const saveButton = queryByTestId(container, `save-${taskId}`);
    fireEvent.click(saveButton);
    await waitFor(() => expect(updateTaskMutationFn).toHaveBeenCalled());
    expect(queryByText(container, updatedTask.title)).toBeInTheDocument();
  });

  it('edit the task and press cancel should not change the title of the task', async () => {
    const { container } = renderWithMocks(<TasksList />, [
      tasksMock,
      getMainTasksMock,
      updateTaskMock,
    ]);

    await waitForElements(container);
    const taskId = tasks[0].id;
    const editButton = queryByTestId(container, `edit-${taskId}`);
    fireEvent.click(editButton);
    const inputNode = container.querySelector('input');
    fireEvent.change(inputNode, { target: { value: updatedTask.title } });
    const cancelButton = queryByTestId(container, `cancel-${taskId}`);
    fireEvent.click(cancelButton);
    await waitFor(() => expect(updateTaskMutationFn).not.toHaveBeenCalled());
    expect(queryByText(container, updatedTask.title)).not.toBeInTheDocument();
  });
});
