import React from 'react';
import { render, screen } from '@testing-library/react';

import UserLoginEditDialogComponent from '../UserLoginEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userLogin edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserLoginEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userLogin-edit-dialog-component')).toBeInTheDocument();
});
