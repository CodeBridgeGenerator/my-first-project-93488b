import React from 'react';
import { render, screen } from '@testing-library/react';

import NotificationsEditDialogComponent from '../NotificationsEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders notifications edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NotificationsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('notifications-edit-dialog-component')).toBeInTheDocument();
});
