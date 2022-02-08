import React, { useState, useEffect } from "react";

const USERS_URL = 'https://example.com/api/users';
const PAGE_SIZE = 10;
export default function Table () {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageone, setPageOne] = useState(false);
  const [pageend, setPageEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetch(USERS_URL + `?page=0`)
      .then((res) => res.json())
      .then((data) => {
        setPageOne(false);
        setPageEnd(false);        
        setLoading(false);
        setUser(data.results);
        setLastPage(Math.ceil(data.count / PAGE_SIZE));
       })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gotofirstpage = (page) => {
    setPageOne(false);
    setPageEnd(false);


    setLoading(true);
    setPageOne(true);
    setPage(page);
    setPageEnd(false);
    fetch(USERS_URL + `?page=${page}`)
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

    fetch(USERS_URL + `?page=${page}`)
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
    fetch(USERS_URL + `?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
        setPageOne(false);
        if (page === lastPage-1) {
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
    fetch(USERS_URL + `?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data.results);
        setPageOne(false);
        if (page === lastPage-1) {
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
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  };




  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
                  <Tbody users={users} />
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn"
                onClick={() => gotofirstpage()}
                disabled={loading || pageone}
        >
        first
        </button>



        <button className="previous-page-btn"
          onClick={() => gotopreviouspage(page - 1)}
          disabled={loading || pageone}
        >previous</button>
        <button className="next-page-btn"
        
           onClick={() => gotonextpage(page + 1)}
          disabled={loading || pageend}       
        >
        {" "}
          next
        {" "}        
        </button>
        <button className="last-page-btn"
          onClick={() => gotolastpage(lastPage)}
          disabled={loading || pageend}      
        >last</button>
      </section>
    </div>
  );
};
