import React from 'react';
import { InMemoryCache } from '@apollo/client';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {
  waitFor,
  fireEvent,
  queryAllByText,
  queryByLabelText,
} from '@testing-library/react';
import { typePolicies } from 'src/graphql/typePolicies';
import tasks from 'src/mocks/data/tasks';
import updatedTask from 'src/mocks/data/createdTask';
import renderWithMocksGenerator from 'src/mocks/utils/render-with-mocks';
import getSubTasksMock from 'src/mocks/responses/getSubTasksMock';
import createSubtaskMock, {
  mutationFn as createSubtaskMutationFn,
} from 'src/mocks/responses/createSubtaskMock';
import TaskItem from '../index';

const undoneTaskProps = {
  id: tasks[0].id,
  title: tasks[0].title,
  completed: tasks[0].completed,
};

let renderWithMocks;
beforeEach(() => {
  // This way we always have a fresh version
  // of the MockedProvider's cache
  // and our test units wouldn't have the side effect
  const mockedCache = new InMemoryCache({ typePolicies });
  renderWithMocks = renderWithMocksGenerator(mockedCache);
});

describe('<TaskItem />', () => {
  it('should renders the component', () => {
    const { container } = renderWithMocks(<TaskItem {...undoneTaskProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display all the title of the tasks', () => {
    const { container } = renderWithMocks(<TaskItem {...undoneTaskProps} />);
    expect(queryAllByText(container, undoneTaskProps.title).length).toBe(1);
  });

  it('press the add new subtask button should display a input field', () => {
    const { container } = renderWithMocks(<TaskItem {...undoneTaskProps} />);
    const addButton = queryByLabelText(container, 'add');
    fireEvent.click(addButton);
    const inputNode = container.querySelector('input');
    expect(inputNode).toBeVisible();
  });

  it("add a new subtask and press enter should display the task's title", async () => {
    const { container } = renderWithMocks(<TaskItem {...undoneTaskProps} />, [
      createSubtaskMock,
      getSubTasksMock,
    ]);
    const addButton = queryByLabelText(container, 'add');
    fireEvent.click(addButton);
    const inputNode = container.querySelector('input');
    fireEvent.change(inputNode, { target: { value: updatedTask.title } });
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    await waitFor(() => expect(createSubtaskMutationFn).toHaveBeenCalled());
  });

  it("clicking on the edit button should display an input field with the default value of the task's title", () => {
    const { container } = renderWithMocks(<TaskItem {...undoneTaskProps} />);
    const editButton = queryByLabelText(container, 'edit');
    fireEvent.click(editButton);
    const inputNode = container.querySelector('input');
    expect(inputNode.value).toBe(undoneTaskProps.title);
  });
});
