import React from 'react';
import { render, screen } from '@testing-library/react';

import SuperiorCreateDialogComponent from '../SuperiorCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders superior create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SuperiorCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('superior-create-dialog-component')).toBeInTheDocument();
});
