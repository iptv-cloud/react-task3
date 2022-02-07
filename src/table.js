import React, { useState, useEffect } from "react";
//const USERS_URL = `https://randomuser.me/api`;
const USERS_URL = `https://api.themoviedb.org/3/search/movie?y=2009&api_key=01397a8a48c5389d13ae91dc2ed71feb&query=go%20with`;

//const USERS_URL = `https://reqres.in/api/users`;
//const USERS_URL = `https://example.com/api/users`;
const PAGE_SIZE = 5;
// const styles = {
// .pagination {
//     text-align: "center"

// },
// .first-page-btn {
//     text-align: "center"

// },
// .previos-page-btn {
//     text-align: "center"

// },
// .next-page-btn {
//     text-align: "center"

// },
// .last-page-btn {
//     text-align: "center"

// }
// }

export default function Table() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageone, setPageOne] = useState(false);
  const [pageend, setPageEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    fetch(USERS_URL + `&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
        console.log(data.results);
        //setLastPage(Math.ceil(data.total_pages % PAGE_SIZE));
        setLastPage(data.total_pages);
        console.log(data.total_pages);
        console.log(data.total_results);
        console.log(Math.ceil(data.count % PAGE_SIZE));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gotofirstpage = (page) => {
    setLoading(true);
    setPageOne(true);
    setPage(page);
    setPageEnd(false);
    fetch(USERS_URL + `&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotopreviouspage = (page) => {
    setPage(page);
    setLoading(true);
    if (page === 1) {
      setPageOne(true);
    }
    if (page !== lastPage) {
      setPageEnd(false);
    }

    fetch(USERS_URL + `&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotonextpage = (page) => {
    setPage(page);
    setLoading(true);
    fetch(USERS_URL + `&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
        setPageOne(false);
        if (page === lastPage) {
          setPageEnd(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotolastpage = (page) => {
    setPage(page);
    setLoading(true);
    fetch(USERS_URL + `&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
        setPageOne(false);
        if (page === lastPage) {
          setPageEnd(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPageEnd(true);
  };

  const Tbody = ({ users }) => {
    return (
      <React.Fragment>
        {users.map((user) => {
          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.original_title}</td>
              <td>{user.title}</td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> First Name </th>
            <th> Last Name </th>
          </tr>
        </thead>
        <tbody>
          <Tbody users={users} />
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          onClick={() => gotofirstpage(1)}
          disabled={loading || pageone}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          onClick={() => gotopreviouspage(page - 1)}
          disabled={loading || pageone}
        >
          {" "}
          previous{" "}
        </button>
        <button
          className="next-page-btn"
          onClick={() => gotonextpage(page + 1)}
          disabled={loading || pageend}
        >
          {" "}
          next{" "}
        </button>
        <button
          className="last-page-btn"
          onClick={() => gotolastpage(lastPage)}
          disabled={loading || pageend}
        >
          last
        </button>
      </section>
    </div>
  );
}
