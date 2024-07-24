import React from 'react';
import { render, screen } from '@testing-library/react';

import UserAddressesPage from '../UserAddressesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userAddresses page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserAddressesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userAddresses-datatable')).toBeInTheDocument();
    expect(screen.getByRole('userAddresses-add-button')).toBeInTheDocument();
});
