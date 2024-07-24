import React from 'react';
import { render, screen } from '@testing-library/react';

import PermissionServicesPage from '../PermissionServicesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders permissionServices page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PermissionServicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('permissionServices-datatable')).toBeInTheDocument();
    expect(screen.getByRole('permissionServices-add-button')).toBeInTheDocument();
});
