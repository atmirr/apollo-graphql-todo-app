import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AppBar from '../index';

describe('<AppBar />', () => {
  it('should renders the component', () => {
    const { container } = render(<AppBar />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
