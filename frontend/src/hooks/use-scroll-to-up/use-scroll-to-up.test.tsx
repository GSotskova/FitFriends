import React from 'react';
import useScrollToUp from './use-scroll-to-up';


jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/fake',
  }),
}));

describe('useScrollToUp', () => {
  it('calls window.scrollTo', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    window.scrollTo = jest.fn();

    useScrollToUp();
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
