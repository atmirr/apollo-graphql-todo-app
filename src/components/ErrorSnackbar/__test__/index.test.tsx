import React from 'react';
import { InMemoryCache } from '@apollo/client';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { findByText } from '@testing-library/react';
import renderWithMocksGenerator from 'src/mocks/utils/render-with-mocks';
import ErrorSnackbar from '../index';

const error = 'An error has been occurred!';

let renderWithMocks;
beforeEach(() => {
  // This way we always have a fresh version
  // of the MockedProvider's cache
  // and our test units wouldn't have the side effect
  const mockedCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          error() {
            // We have to store the error directly into the cache object
            // since it is a local-only field and gets its value from
            // a react variable in the main application
            return error;
          },
        },
      },
    },
  });
  renderWithMocks = renderWithMocksGenerator(mockedCache);
});

describe('<ErrorSnackbar />', () => {
  it('should display an error when we have GraphQL error', async () => {
    const { container } = renderWithMocks(<ErrorSnackbar />);
    expect(await findByText(container, error)).toBeVisible();
  });
});
