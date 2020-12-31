import React from 'react';

import { render, fireEvent, cleanup, screen, getByTestId } from '@testing-library/react'
import Book from './Book';

describe('should test book component',() => {
    const mock = jest.fn(() => {});
    const props = {
        id:'1AB23',
        title:'React JS',
        index: 0 ,
        addToWishList: mock,
        description: 'description',
        showWishListButton: true,
        publishedDate: '2020-12-10',
    };

    let book;

    beforeEach(() => {
        book = render(
            <Book  {...props}/>
        )
    });

    afterEach(() => {
        cleanup();
    })

    it('should test render book correctly', () => {
        expect(screen.getByTestId('book-title').textContent).toBe('React JS');
        expect(screen.getByTestId('book-description').textContent).toBe('description');
        expect(screen.getByTestId('published-date').textContent?.trim()).toBe('2020');
    });

    it('should show the wishListButton', () => {
        expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
    });

    it('should click wishlist button and call the mock', () => {
        fireEvent.click(screen.getByTestId('wishlist-button'));
        expect(mock).toHaveBeenCalledTimes(1);
    })
});
