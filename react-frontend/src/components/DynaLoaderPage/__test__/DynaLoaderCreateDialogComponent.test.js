import React from 'react';
import { render, screen } from '@testing-library/react';

import DynaLoaderCreateDialogComponent from '../DynaLoaderCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders dynaLoader create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DynaLoaderCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('dynaLoader-create-dialog-component')).toBeInTheDocument();
});
