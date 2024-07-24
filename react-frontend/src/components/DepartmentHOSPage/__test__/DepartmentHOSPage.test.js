import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentHOSPage from '../DepartmentHOSPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentHOS page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentHOSPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentHOS-datatable')).toBeInTheDocument();
    expect(screen.getByRole('departmentHOS-add-button')).toBeInTheDocument();
});
