import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentsPage from '../DepartmentsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departments page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departments-datatable')).toBeInTheDocument();
    expect(screen.getByRole('departments-add-button')).toBeInTheDocument();
});
