import { ReactElement } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import {
  render,
  RenderOptions as RenderOptionsType,
} from '@testing-library/react';
import { typePolicies } from 'src/graphql/typePolicies';

const defaultMockedCache = new InMemoryCache({ typePolicies });
const renderWithMocks = (mockedCache = defaultMockedCache) => (
  children: ReactElement,
  mocksResponses?: MockedResponse[],
  RenderOptions?: RenderOptionsType,
) =>
  render(
    <MockedProvider mocks={mocksResponses} cache={mockedCache}>
      {children}
    </MockedProvider>,
    RenderOptions,
  );

export default renderWithMocks;
