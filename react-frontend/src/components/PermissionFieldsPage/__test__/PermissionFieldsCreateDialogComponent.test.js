import React from 'react';
import { render, screen } from '@testing-library/react';

import PermissionFieldsCreateDialogComponent from '../PermissionFieldsCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders permissionFields create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PermissionFieldsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('permissionFields-create-dialog-component')).toBeInTheDocument();
});
