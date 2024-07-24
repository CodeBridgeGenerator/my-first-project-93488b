import React from 'react';
import { render, screen } from '@testing-library/react';

import UserLoginPage from '../UserLoginPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userLogin page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserLoginPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userLogin-datatable')).toBeInTheDocument();
    expect(screen.getByRole('userLogin-add-button')).toBeInTheDocument();
});
