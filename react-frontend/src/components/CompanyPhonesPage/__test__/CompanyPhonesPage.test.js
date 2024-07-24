import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyPhonesPage from '../CompanyPhonesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyPhones page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyPhonesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyPhones-datatable')).toBeInTheDocument();
    expect(screen.getByRole('companyPhones-add-button')).toBeInTheDocument();
});
