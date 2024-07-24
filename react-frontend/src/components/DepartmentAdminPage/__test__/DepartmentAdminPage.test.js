import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentAdminPage from '../DepartmentAdminPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentAdmin page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentAdminPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentAdmin-datatable')).toBeInTheDocument();
    expect(screen.getByRole('departmentAdmin-add-button')).toBeInTheDocument();
});
