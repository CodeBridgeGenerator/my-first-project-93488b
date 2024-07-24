import React from 'react';
import { render, screen } from '@testing-library/react';

import CompaniesPage from '../CompaniesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companies page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompaniesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companies-datatable')).toBeInTheDocument();
    expect(screen.getByRole('companies-add-button')).toBeInTheDocument();
});
