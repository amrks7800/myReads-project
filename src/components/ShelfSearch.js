import React from "react";
import Book from "./Book";

const ShelfSearch = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Search</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* Book */}

          {props.loadSearch
            ? props.booksFromSearch.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  changeShelf={props.changeShelf}
                />
              ))
            : props.booksFromSearch}
        </ol>
      </div>
    </div>
  );
};

export default ShelfSearch;
