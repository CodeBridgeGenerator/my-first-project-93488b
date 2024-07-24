import React from 'react';
import { render, screen } from '@testing-library/react';

import UserLoginCreateDialogComponent from '../UserLoginCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userLogin create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserLoginCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userLogin-create-dialog-component')).toBeInTheDocument();
});
