import React from 'react';
import { render, screen } from '@testing-library/react';

import InboxPage from '../InboxPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders inbox page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InboxPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('inbox-datatable')).toBeInTheDocument();
    expect(screen.getByRole('inbox-add-button')).toBeInTheDocument();
});
