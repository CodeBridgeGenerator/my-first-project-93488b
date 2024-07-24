import React from 'react';
import { render, screen } from '@testing-library/react';

import UserInvitesPage from '../UserInvitesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userInvites page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInvitesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userInvites-datatable')).toBeInTheDocument();
    expect(screen.getByRole('userInvites-add-button')).toBeInTheDocument();
});
