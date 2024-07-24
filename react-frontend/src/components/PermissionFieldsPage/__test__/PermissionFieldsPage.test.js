import React from 'react';
import { render, screen } from '@testing-library/react';

import PermissionFieldsPage from '../PermissionFieldsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders permissionFields page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PermissionFieldsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('permissionFields-datatable')).toBeInTheDocument();
    expect(screen.getByRole('permissionFields-add-button')).toBeInTheDocument();
});
