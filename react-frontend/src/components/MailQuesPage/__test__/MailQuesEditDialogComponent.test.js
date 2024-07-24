import React from 'react';
import { render, screen } from '@testing-library/react';

import MailQuesEditDialogComponent from '../MailQuesEditDialogComponent';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mailQues edit dialog', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailQuesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mailQues-edit-dialog-component')).toBeInTheDocument();
});
