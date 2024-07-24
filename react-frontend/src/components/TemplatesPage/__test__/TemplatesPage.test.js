import React from 'react';
import { render, screen } from '@testing-library/react';

import TemplatesPage from '../TemplatesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders templates page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TemplatesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('templates-datatable')).toBeInTheDocument();
    expect(screen.getByRole('templates-add-button')).toBeInTheDocument();
});
