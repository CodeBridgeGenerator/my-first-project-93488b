import React from 'react';
import { render, screen } from '@testing-library/react';

import UserPhonesPage from '../UserPhonesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders userPhones page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserPhonesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('userPhones-datatable')).toBeInTheDocument();
    expect(screen.getByRole('userPhones-add-button')).toBeInTheDocument();
});
