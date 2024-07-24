import React from 'react';
import { render, screen } from '@testing-library/react';

import JobQuesPage from '../JobQuesPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from '../../../models';

test('renders jobQues page', async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobQuesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole('jobQues-datatable')).toBeInTheDocument();
    expect(screen.getByRole('jobQues-add-button')).toBeInTheDocument();
});
