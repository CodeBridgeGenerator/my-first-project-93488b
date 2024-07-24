import React from 'react';
import { render, screen } from '@testing-library/react';

import UserInvitesEditDialogComponent from '../UserInvitesEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userInvites edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInvitesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userInvites-edit-dialog-component')).toBeInTheDocument();
});
