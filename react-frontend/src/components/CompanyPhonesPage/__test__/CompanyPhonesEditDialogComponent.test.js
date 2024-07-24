import React from 'react';
import { render, screen } from '@testing-library/react';

import CompanyPhonesEditDialogComponent from '../CompanyPhonesEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders companyPhones edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompanyPhonesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('companyPhones-edit-dialog-component')).toBeInTheDocument();
});
