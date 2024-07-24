import React from 'react';
import { render, screen } from '@testing-library/react';

import PromptsPage from '../PromptsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders prompts page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PromptsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('prompts-datatable')).toBeInTheDocument();
    expect(screen.getByRole('prompts-add-button')).toBeInTheDocument();
});
