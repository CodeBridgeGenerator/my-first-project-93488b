import React from 'react';
import { render, screen } from '@testing-library/react';

import SuperiorEditDialogComponent from '../SuperiorEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders superior edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SuperiorEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('superior-edit-dialog-component')).toBeInTheDocument();
});
