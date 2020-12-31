import React from 'react';
import './Book.scss';

export interface BookVolumeInfo {
    imageLinks?: {thumbnail?: string};
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
}

export interface BookType extends Partial<BookVolumeInfo> {
    image?: string;
    id: string;
}

export interface BookEvents {
    addToWishList: ( id: string ) => void;
}

const book: React.FunctionComponent<BookType & BookEvents & {showWishListButton: boolean}> = (props) => {
    return (
        <div className="book-container">
            <div className="image-button-container">
                <div className="book-image">
                    <img alt={props.title} src={props.image}/>
                </div>
                {
                    props.showWishListButton && (
                        <div className="book-wishlist-button-container">
                            <button data-testid="wishlist-button" type="button" onClick={() => props.addToWishList(props.id) }>Add to wishlist</button>
                        </div>
                    )
                }
            </div>
            <div className="book-info-container">
                <h1 data-testid="book-title">{props.title}</h1>
                <div className="book-authors">
                    {props.authors && props.authors?.map((author, index) => 1 + index === props.authors?.length  ? (<b key={index}>{author}</b>) : <b key={index}> {author}, &nbsp;</b> )}
                </div>
                <div data-testid="published-date" className="book-publisher"><p>{props.publisher} &nbsp;</p> <p>{props.publishedDate && new Date(props.publishedDate).getFullYear()}</p></div>
                <p data-testid="book-description">{props.description}</p>
            </div>
        </div>
    );
};

export default book;