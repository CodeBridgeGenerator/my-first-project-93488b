import React from 'react';
import { render, screen } from '@testing-library/react';

import TestsEditDialogComponent from '../TestsEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders tests edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TestsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('tests-edit-dialog-component')).toBeInTheDocument();
});
