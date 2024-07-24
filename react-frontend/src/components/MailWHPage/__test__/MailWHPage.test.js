import React from 'react';
import { render, screen } from '@testing-library/react';

import MailWHPage from '../MailWHPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mailWH page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailWHPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mailWH-datatable')).toBeInTheDocument();
    expect(screen.getByRole('mailWH-add-button')).toBeInTheDocument();
});
