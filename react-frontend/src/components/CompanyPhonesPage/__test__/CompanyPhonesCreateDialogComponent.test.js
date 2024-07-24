import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyPhonesCreateDialogComponent from '../CompanyPhonesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyPhones create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyPhonesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyPhones-create-dialog-component')).toBeInTheDocument();
});
