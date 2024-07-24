import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorsWHPage from '../ErrorsWHPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders errorsWH page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsWHPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('errorsWH-datatable')).toBeInTheDocument();
    expect(screen.getByRole('errorsWH-add-button')).toBeInTheDocument();
});
