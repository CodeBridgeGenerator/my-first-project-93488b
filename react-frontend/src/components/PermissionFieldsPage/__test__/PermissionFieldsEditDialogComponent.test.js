import React from 'react';
import { render, screen } from '@testing-library/react';

import PermissionFieldsEditDialogComponent from '../PermissionFieldsEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders permissionFields edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PermissionFieldsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('permissionFields-edit-dialog-component')).toBeInTheDocument();
});
