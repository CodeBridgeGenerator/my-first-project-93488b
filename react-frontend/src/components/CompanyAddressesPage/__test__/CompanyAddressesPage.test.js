import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyAddressesPage from '../CompanyAddressesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyAddresses page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyAddressesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyAddresses-datatable')).toBeInTheDocument();
    expect(screen.getByRole('companyAddresses-add-button')).toBeInTheDocument();
});
