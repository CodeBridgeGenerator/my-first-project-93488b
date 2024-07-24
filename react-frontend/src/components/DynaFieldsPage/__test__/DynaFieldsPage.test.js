import React from 'react';
import { render, screen } from '@testing-library/react';

import DynaFieldsPage from '../DynaFieldsPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders dynaFields page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DynaFieldsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('dynaFields-datatable')).toBeInTheDocument();
    expect(screen.getByRole('dynaFields-add-button')).toBeInTheDocument();
});
