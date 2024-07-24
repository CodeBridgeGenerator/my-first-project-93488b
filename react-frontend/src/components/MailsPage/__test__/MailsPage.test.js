import React from 'react';
import { render, screen } from '@testing-library/react';

import MailsPage from '../MailsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mails page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mails-datatable')).toBeInTheDocument();
    expect(screen.getByRole('mails-add-button')).toBeInTheDocument();
});
