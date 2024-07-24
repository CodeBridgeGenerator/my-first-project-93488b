import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorsWHEditDialogComponent from '../ErrorsWHEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders errorsWH edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsWHEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('errorsWH-edit-dialog-component')).toBeInTheDocument();
});
