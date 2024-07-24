import React from 'react';
import { render, screen } from '@testing-library/react';

import UsersPage from '../UsersPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders users page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UsersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('users-datatable')).toBeInTheDocument();
    expect(screen.getByRole('users-add-button')).toBeInTheDocument();
});
