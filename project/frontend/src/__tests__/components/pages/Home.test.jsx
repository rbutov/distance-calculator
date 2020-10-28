import React from 'react';
import {act, cleanup, render, screen} from '@testing-library/react';
import Home from '../../../components/pages/Home';
import {Provider} from 'react-redux';
import store from '../../../store';
import {fireEvent} from '@testing-library/dom';

describe('<Home />', () => {
  afterEach(cleanup);

  it('_calculate button', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    const linkElement = screen.getByText(/Calculate/i);
    expect(linkElement).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText(/Calculate/i));
    });
    const errorElement = screen.queryAllByText(/Not valid Geo or Location/i);

    errorElement.forEach(el => {
      expect(el).toBeInTheDocument();
    });
  });
});
