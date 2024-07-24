import React from 'react';
import { render, screen } from '@testing-library/react';

import MailWHCreateDialogComponent from '../MailWHCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mailWH create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailWHCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mailWH-create-dialog-component')).toBeInTheDocument();
});
