import React from 'react';
import { render, screen } from '@testing-library/react';

import StaffinfoPage from '../StaffinfoPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders staffinfo page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StaffinfoPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('staffinfo-datatable')).toBeInTheDocument();
    expect(screen.getByRole('staffinfo-add-button')).toBeInTheDocument();
});
