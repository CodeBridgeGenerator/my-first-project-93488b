import React from 'react';
import { render, screen } from '@testing-library/react';

import PositionsPage from '../PositionsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders positions page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PositionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('positions-datatable')).toBeInTheDocument();
    expect(screen.getByRole('positions-add-button')).toBeInTheDocument();
});
