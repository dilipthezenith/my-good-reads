import React from 'react';

import { cleanup, render } from '@testing-library/react'
import BookSearch from './BookSearch';

describe('should test book search',() => {

    beforeEach(() => {
        const bookSearch = render(
            <BookSearch/>
        )
    });

    afterEach(() => {
        cleanup();
    })

    it('should render book search correctly', () => {
        // to do
    });
});

