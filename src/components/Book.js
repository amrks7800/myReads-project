import React from "react";

const Book = (props) => {
  const updateShelf = (event) => {
    props.changeShelf(props.book, event.target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: props.book.imageLinks
                ? `url(${props.book.imageLinks.smallThumbnail})`
                : "",
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={updateShelf}
              value={props.book.shelf ? props.book.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
        <div className="book-authors">
          <strong>{props.book.shelf ? props.book.shelf : "none"}</strong>
        </div>
      </div>
    </li>
  );
};

export default Book;
