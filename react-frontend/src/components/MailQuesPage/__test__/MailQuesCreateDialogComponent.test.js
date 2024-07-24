import React from 'react';
import { render, screen } from '@testing-library/react';

import MailQuesCreateDialogComponent from '../MailQuesCreateDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mailQues create dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailQuesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mailQues-create-dialog-component')).toBeInTheDocument();
});
