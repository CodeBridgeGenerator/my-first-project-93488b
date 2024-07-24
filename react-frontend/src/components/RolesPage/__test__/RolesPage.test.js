import React from 'react';
import { render, screen } from '@testing-library/react';

import RolesPage from '../RolesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders roles page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RolesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('roles-datatable')).toBeInTheDocument();
    expect(screen.getByRole('roles-add-button')).toBeInTheDocument();
});
