import React from 'react';
import { render, screen } from '@testing-library/react';

import DepartmentHOSCreateDialogComponent from '../DepartmentHOSCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders departmentHOS create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentHOSCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('departmentHOS-create-dialog-component')).toBeInTheDocument();
});
