import React from 'react';
import './WishList.scss';
import { BookType } from './../Book/Book';

export interface WishListProps {
    books: BookType[],
    removeFromWishList: (id: string) => void;
}

const wishList: React.FunctionComponent<WishListProps> = (props) => {
        return(
            <div className='wish-list-container'>
                <p>My wish list ({props.books.length})</p>
                <hr/>
                {props.books.map((book, index) => {
                    return(
                        <div key={book.id} className='books-wishlist'>
                            <p> {book.title} </p>
                            <a role='button' onClick={() => props.removeFromWishList(book.id)}>{' '}X</a>
                        </div>
                    );
                })}
            </div>  
        );
};

export default wishList;