import React from 'react';
import { render, screen } from '@testing-library/react';

import DynaLoaderPage from '../DynaLoaderPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders dynaLoader page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DynaLoaderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('dynaLoader-datatable')).toBeInTheDocument();
    expect(screen.getByRole('dynaLoader-add-button')).toBeInTheDocument();
});
