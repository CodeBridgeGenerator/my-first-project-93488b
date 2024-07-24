import React from 'react';
import { render, screen } from '@testing-library/react';

import StaffinfoEditDialogComponent from '../StaffinfoEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders staffinfo edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StaffinfoEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('staffinfo-edit-dialog-component')).toBeInTheDocument();
});
