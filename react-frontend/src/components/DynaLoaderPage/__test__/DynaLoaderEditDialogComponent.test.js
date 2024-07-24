import React from 'react';
import { render, screen } from '@testing-library/react';

import DynaLoaderEditDialogComponent from '../DynaLoaderEditDialogComponent1';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders dynaLoader edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DynaLoaderEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('dynaLoader-edit-dialog-component')).toBeInTheDocument();
});
