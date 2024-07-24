import React from 'react';
import { render, screen } from '@testing-library/react';

import TestsPage from '../TestsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders tests page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TestsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('tests-datatable')).toBeInTheDocument();
    expect(screen.getByRole('tests-add-button')).toBeInTheDocument();
});
