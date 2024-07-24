import React from 'react';
import { render, screen } from '@testing-library/react';

import SectionsPage from '../SectionsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders sections page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SectionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('sections-datatable')).toBeInTheDocument();
    expect(screen.getByRole('sections-add-button')).toBeInTheDocument();
});
