import React from 'react';
import { render, screen } from '@testing-library/react';

import NotificationsPage from '../NotificationsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders notifications page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NotificationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('notifications-datatable')).toBeInTheDocument();
    expect(screen.getByRole('notifications-add-button')).toBeInTheDocument();
});
