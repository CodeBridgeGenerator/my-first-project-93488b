import React from 'react';
import { render, screen } from '@testing-library/react';

import MailQuesPage from '../MailQuesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders mailQues page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MailQuesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('mailQues-datatable')).toBeInTheDocument();
    expect(screen.getByRole('mailQues-add-button')).toBeInTheDocument();
});
