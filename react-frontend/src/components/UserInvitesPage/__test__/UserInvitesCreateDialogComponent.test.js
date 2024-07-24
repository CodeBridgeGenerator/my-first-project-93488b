import React from 'react';
import { render, screen } from '@testing-library/react';

import UserInvitesCreateDialogComponent from '../UserInvitesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userInvites create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInvitesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userInvites-create-dialog-component')).toBeInTheDocument();
});
