import React from 'react';
import { InMemoryCache } from '@apollo/client';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, findByText } from '@testing-library/react';
import { typePolicies } from 'src/graphql/typePolicies';
import tasks from 'src/mocks/data/tasks';
import createdTask from 'src/mocks/data/createdTask';
import renderWithMocksGenerator from 'src/mocks/utils/render-with-mocks';
import tasksMock from 'src/mocks/responses/tasksMock';
import getMainTasksMock from 'src/mocks/responses/getMainTasksMock';
import createTaskMock, { mutationFn } from 'src/mocks/responses/createTaskMock';
import Main from './Main';

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

describe('<Main />', () => {
  it('should renders the component', async () => {
    const { container } = renderWithMocks(<Main />, [
      tasksMock,
      getMainTasksMock,
    ]);

    await waitForElements(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('typing in the text field and press enter should add a task into the list', async () => {
    const { container } = renderWithMocks(<Main />, [
      tasksMock,
      getMainTasksMock,
      createTaskMock,
    ]);

    await waitForElements(container);
    const inputNode = container.querySelector('input');
    fireEvent.change(inputNode, { target: { value: createdTask.title } });
    expect(inputNode.value).toBe(createdTask.title);
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(await findByText(container, createdTask.title)).toBeVisible();
    expect(mutationFn).toHaveBeenCalled();
  });

  it('pressing enter without adding any text should not call the mutation', async () => {
    const { container } = renderWithMocks(<Main />, [
      tasksMock,
      getMainTasksMock,
      createTaskMock,
    ]);

    await waitForElements(container);
    const inputNode = container.querySelector('input');
    expect(inputNode.value).toBe('');
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(screen.queryAllByText(container, createdTask.title).length).toBe(0);
    expect(mutationFn).not.toHaveBeenCalled();
  });
});
