import React from 'react';
import { render, screen } from '@testing-library/react';

import StaffinfoCreateDialogComponent from '../StaffinfoCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders staffinfo create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StaffinfoCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('staffinfo-create-dialog-component')).toBeInTheDocument();
});
