import React from 'react';
import { render, screen } from '@testing-library/react';

import ChataiPage from '../ChataiPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders chatai page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChataiPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('chatai-datatable')).toBeInTheDocument();
    expect(screen.getByRole('chatai-add-button')).toBeInTheDocument();
});
