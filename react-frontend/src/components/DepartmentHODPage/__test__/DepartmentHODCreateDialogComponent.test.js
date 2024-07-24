import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentHODCreateDialogComponent from '../DepartmentHODCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentHOD create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentHODCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentHOD-create-dialog-component')).toBeInTheDocument();
});
