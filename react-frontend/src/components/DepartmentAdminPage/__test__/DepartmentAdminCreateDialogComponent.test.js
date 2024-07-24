import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentAdminCreateDialogComponent from '../DepartmentAdminCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentAdmin create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentAdminCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentAdmin-create-dialog-component')).toBeInTheDocument();
});
