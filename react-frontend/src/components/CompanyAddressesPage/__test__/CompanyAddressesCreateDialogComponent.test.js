import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyAddressesCreateDialogComponent from '../CompanyAddressesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyAddresses create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyAddressesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyAddresses-create-dialog-component')).toBeInTheDocument();
});
