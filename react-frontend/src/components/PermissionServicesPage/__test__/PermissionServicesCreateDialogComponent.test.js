import React from 'react';
import { render, screen } from '@testing-library/react';

import PermissionServicesCreateDialogComponent from '../PermissionServicesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders permissionServices create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PermissionServicesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('permissionServices-create-dialog-component')).toBeInTheDocument();
});
