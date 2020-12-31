import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";
import Book, { BookType, BookVolumeInfo } from '../Book/Book';
import WishList from "../WishList/WishList";

const timer = 500;
let timeoutID: number;
const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<BookType[]>([]);
    const [wishList, updateWishList] = useState<BookType[]>([]);

    async function requestBooks() {
        if (bookTypeToSearch) {
            const { items }= await getBooksByType(bookTypeToSearch);
            if (items) {
                const searchResult: BookType[] = [];
                items.forEach((book: any) => {
                    const { volumeInfo }: { volumeInfo: BookVolumeInfo } = book;
                    searchResult.push({
                        authors: volumeInfo.authors,
                        description: volumeInfo.description,
                        id: book.id,
                        image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '',
                        publisher: volumeInfo.publisher,
                        publishedDate: volumeInfo.publishedDate,
                        title: volumeInfo.title
                    });
                });
                setAllAvailableBooks(searchResult);
            } else {
                // ERROR !
                setAllAvailableBooks([]);
            }
        } else
            setAllAvailableBooks([]);
        if (timeoutID)
            window.clearTimeout(timeoutID);
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);

    useEffect(() => {
        if (timeoutID)
            window.clearTimeout(timeoutID);
        if (bookType)
            timeoutID = window.setTimeout(() => updateBookTypeToSearch(bookType), timer);
        else
            setAllAvailableBooks([]);
    }, [bookType]);

    const removeFromWishList = (id: string)  => {
        const newWishList = wishList.filter((book) => book.id !== id);
        if (newWishList)
            updateWishList(newWishList);
    }

    const addToWishList = (id: string) => {
        const books = wishList.slice();
        const matchingBook = allAvailableBooks.find((book) => book.id === id);
        if (matchingBook) {
            books.push(matchingBook);
            updateWishList(books);
        }
    }

    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    debugger;
                                    e.preventDefault();
                                   updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="booklist-container">
                    {allAvailableBooks.length == 0 && bookType && <p className="loading">loading...</p>}

                    {allAvailableBooks.length > 0 && (
                        <div className="list">
                            <ul>
                                {
                                    allAvailableBooks.map((book: BookType, index: number) => {
                                        return(
                                            <li key={book.id}>
                                                <Book
                                                    addToWishList={addToWishList}
                                                    showWishListButton={wishList.every((wishBook) => wishBook.id !== book.id)}
                                                    {...book}
                                                />
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    )}
                    {allAvailableBooks.length > 0 && wishList.length > 0 && (
                        <div className="wish-list">
                            <WishList books={wishList} removeFromWishList={removeFromWishList} />
                        </div>
                    )}
                </div>
                {!bookType && (
                    <div className="empty">
                        <p>
                            Try searching for a topic, for example
                            <a onClick={() => {
                                    updateBookType("Javascript");
                                }}
                            >
                                {" "}
                                "Javascript"
                            </a>
                        </p>
                    </div>
                )}
            </>
    );
};

export default BookSearch;
