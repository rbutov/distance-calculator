import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';

import AddressInput from '../../../components/shared/AddressInput';

describe('<AddressInput />', () => {
  afterEach(cleanup);

  it('_test component with error', () => {
    render(
      <AddressInput
        name={'a'}
        value={'belarus'}
        error={true}
        label={'Point Two'}
        placeholder={'Enter you value'}
      />,
    );
    const labelElement = screen.getByText(/Point Two/i);
    const errorElement = screen.getByText(/Not valid Geo or Location/i);
    expect(labelElement).toBeInTheDocument();
    expect(errorElement).toBeInTheDocument();
  });

  it('_test component without error', () => {
    render(
      <AddressInput
        name={'a'}
        value={'belarus'}
        error={false}
        label={'Point Two'}
        placeholder={'Enter you value'}
      />,
    );

    const errorElement = screen.queryByText(/Not valid Geo or Location/i);
    expect(errorElement).not.toBeInTheDocument();
  });
});
