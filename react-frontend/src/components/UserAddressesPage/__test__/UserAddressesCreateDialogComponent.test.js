import React from 'react';
import { render, screen } from '@testing-library/react';

import UserAddressesCreateDialogComponent from '../UserAddressesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userAddresses create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserAddressesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userAddresses-create-dialog-component')).toBeInTheDocument();
});
