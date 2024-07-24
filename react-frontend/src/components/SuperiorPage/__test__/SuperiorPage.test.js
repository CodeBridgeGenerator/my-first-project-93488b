import React from 'react';
import { render, screen } from '@testing-library/react';

import SuperiorPage from '../SuperiorPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders superior page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SuperiorPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('superior-datatable')).toBeInTheDocument();
    expect(screen.getByRole('superior-add-button')).toBeInTheDocument();
});
