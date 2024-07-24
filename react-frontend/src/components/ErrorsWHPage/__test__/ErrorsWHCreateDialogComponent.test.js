import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorsWHCreateDialogComponent from '../ErrorsWHCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders errorsWH create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsWHCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('errorsWH-create-dialog-component')).toBeInTheDocument();
});
