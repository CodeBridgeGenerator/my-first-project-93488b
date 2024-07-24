import React from 'react';
import { render, screen } from '@testing-library/react';

import EditSaveCancelComponent from '../EditSaveCancelComponent';
import '@testing-library/jest-dom';

test('renders edit/save/cancel component', async () => {
    render(<EditSaveCancelComponent isEdit={true} />);
    expect(screen.getByRole('save-button')).toBeInTheDocument();
    expect(screen.getByRole('cancel-button')).toBeInTheDocument();
});

test('renders edit/save/cancel component', async () => {
    render(<EditSaveCancelComponent isEdit={false} />);
    expect(screen.getByRole('edit-button')).toBeInTheDocument();
});
