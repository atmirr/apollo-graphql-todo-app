import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';
import AddNewTask from '../index';

describe('<AddNewTask />', () => {
  it('should renders the component', () => {
    const { container } = render(
      <MockedProvider>
        <AddNewTask />
      </MockedProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('typing in the text field and press enter should make the input empty', () => {
    const { container } = render(
      <MockedProvider>
        <AddNewTask />
      </MockedProvider>,
    );
    const sampleTask = 'New task!';
    const inputNode = container.querySelector('input');
    fireEvent.change(inputNode, { target: { value: sampleTask } });
    expect(inputNode.value).toBe(sampleTask);
    fireEvent.keyDown(inputNode, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(inputNode.value).toBe('');
  });
});
