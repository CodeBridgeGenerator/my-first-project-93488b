import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorsPage from '../ErrorsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders errors page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ErrorsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('errors-datatable')).toBeInTheDocument();
    expect(screen.getByRole('errors-add-button')).toBeInTheDocument();
});
