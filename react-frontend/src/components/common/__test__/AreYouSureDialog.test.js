import React from 'react';
import { render, screen } from '@testing-library/react';

import AreYouSureDialog from '../AreYouSureDialog';
import '@testing-library/jest-dom';

test('renders are you sure dialog', async () => {
    render(<AreYouSureDialog show={true} />);
    expect(screen.getByRole('are-you-sure-body')).toBeInTheDocument();
});
