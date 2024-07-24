import React from 'react';
import { render, screen } from '@testing-library/react';

import Dashboard from '../Dashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders lady image', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('lady-image')).toBeInTheDocument();
});
test('renders welcome label', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('welcome-text')).toBeInTheDocument();
});
test('renders microservices label', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByText('App is ready')).toBeInTheDocument();
});
