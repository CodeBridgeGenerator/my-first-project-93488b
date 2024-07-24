import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentHODPage from '../DepartmentHODPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentHOD page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentHODPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentHOD-datatable')).toBeInTheDocument();
    expect(screen.getByRole('departmentHOD-add-button')).toBeInTheDocument();
});
