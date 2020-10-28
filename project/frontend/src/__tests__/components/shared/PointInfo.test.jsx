import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';

import PointInfo from '../../../components/shared/PointInfo';

describe('<PointInfo />', () => {
  afterEach(cleanup);

  it('_test <PointInfo /> component', () => {
    render(<PointInfo location={'belarus'} geo={'222,333'} />);
    const locationElement = screen.getByText(/belarus/i);
    expect(locationElement).toBeInTheDocument();
    const geoElement = screen.getByText(/222,333/i);
    expect(geoElement).toBeInTheDocument();
  });
});
