import {isLatLng, validateGeo} from '../../helpers/geo';

describe('_geo helper', () => {
  it('_test isLatLng', () => {
    const res = isLatLng('22222,33333');
    expect(res).toBe(true);

    const res2 = isLatLng('22222333');
    expect(res2).toBe(false);
  });

  it('_test validateGeo', () => {
    validateGeo(
      () => {},
      '',
      () => {},
      () => {},
    ).catch(v => {
      expect(v).toBe('empty string');
    });
  });
});
