import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import Home from "./components/Home";
import Search from "./components/Search";

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [booksFromSearch, setBooksFromSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);

  const changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    await BooksAPI.getAll().then((res) => {
      setBooks(res);
    });
    handleBooksSearch(search);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    handleBooksSearch(search);
  };

  const handleBooksSearch = async (search) => {
    await BooksAPI.search(search).then((res) => {
      if (res && !res.error) {
        setBooksFromSearch(
          res.map((booksSearch) => {
            books.forEach((book) => {
              if (booksSearch.id === book.id) booksSearch.shelf = book.shelf;
            });
            return booksSearch;
          })
        );
        setLoadSearch(true);
      } else {
        setBooksFromSearch(`No books like: " ${search} "`);
        setLoadSearch(true);
      }
    }); // then
  };

  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      setBooks(res);
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/search">
            <Search
              handleSearch={handleSearch}
              search={search}
              booksFromSearch={booksFromSearch}
              changeShelf={changeShelf}
              loadSearch={loadSearch}
            />
          </Route>
          <Route path="/">
            <Home books={books} changeShelf={changeShelf} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
