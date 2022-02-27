import { render } from '@testing-library/react';

import NextLib from './next-lib';

describe('NextLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLib />);
    expect(baseElement).toBeTruthy();
  });
});
