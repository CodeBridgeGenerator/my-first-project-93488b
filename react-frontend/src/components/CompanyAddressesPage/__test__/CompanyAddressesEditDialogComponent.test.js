import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyAddressesEditDialogComponent from '../CompanyAddressesEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyAddresses edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyAddressesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyAddresses-edit-dialog-component')).toBeInTheDocument();
});
