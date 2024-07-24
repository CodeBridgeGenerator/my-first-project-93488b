import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentHOSEditDialogComponent from '../DepartmentHOSEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentHOS edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentHOSEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentHOS-edit-dialog-component')).toBeInTheDocument();
});
