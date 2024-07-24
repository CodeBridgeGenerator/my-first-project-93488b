import React from 'react';
import { render, screen } from '@testing-library/react';

import EmployeesPage from '../EmployeesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders employees page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('employees-datatable')).toBeInTheDocument();
    expect(screen.getByRole('employees-add-button')).toBeInTheDocument();
});
