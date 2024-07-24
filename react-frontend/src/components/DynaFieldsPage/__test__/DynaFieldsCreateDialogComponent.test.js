import React from 'react';
import { render, screen } from '@testing-library/react';

import DynaFieldsCreateDialogComponent from '../DynaFieldsCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders dynaFields create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DynaFieldsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('dynaFields-create-dialog-component')).toBeInTheDocument();
});
