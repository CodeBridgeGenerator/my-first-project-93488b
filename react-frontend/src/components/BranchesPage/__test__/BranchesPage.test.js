import React from 'react';
import { render, screen } from '@testing-library/react';

import BranchesPage from '../BranchesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders branches page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BranchesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('branches-datatable')).toBeInTheDocument();
    expect(screen.getByRole('branches-add-button')).toBeInTheDocument();
});
