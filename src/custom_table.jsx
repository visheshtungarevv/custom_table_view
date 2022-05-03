import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

// const baseUrl = "https://api.coinbase.com/v2/currencies";
const Custom_table = () => {
  const [post, setAllPosts] = useState([]);
  const [postData, getPostData] = useState([]);
  const [sortStatus, setSortStatus] = useState([]);
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState(0);

  useEffect(() => {
    listofAgent();
  }, [offset]);
  const listofAgent = async () => {
    let param = {};
    param["search"] = search;
    const res = await axios.get(`https://api.coinbase.com/v2/currencies`);
    const data = res.data.data;
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage);

    // For displaying Data
    const postData = getPostData(slice);

    // Using Hooks to set value
    setAllPosts(postData);
    setPageCount(Math.ceil(data.length / postsPerPage));
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  const emailSort = () => {
    const data = postData;
    if (sortStatus) {
      const sorted = data.sort((a, b) =>
        a.first_name > b.first_name ? 1 : -1
      );
      getPostData(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => (b.first_name > a.first_name ? 1 : -1));
      getPostData(sorted);
      setSortStatus(!sortStatus);
    }
  };
  const currencySort = () => {
    const data = postData;
    if (sortStatus) {
      const sorted = data.sort((a, b) =>
        a.first_name > b.first_name ? 1 : -1
      );
      getPostData(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => (b.first_name > a.first_name ? 1 : -1));
      getPostData(sorted);
      setSortStatus(!sortStatus);
    }
  };
  const countrySort = () => {
    const data = postData;
    if (sortStatus) {
      const sorted = data.sort((a, b) =>
        a.first_name > b.first_name ? 1 : -1
      );
      getPostData(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => (b.first_name > a.first_name ? 1 : -1));
      getPostData(sorted);
      setSortStatus(!sortStatus);
    }
  };
  const searchHandler = (value) => {
    // setSearch(value);
    // const result = postData.filter(item => item ==value);
    var filteredData = postData.filter((obj) => obj["name"] === value);

    console.log("what data on result>>>",filteredData);

  };
  console.log(post, "post");

  return (
    <div className="App">
      <div>
        <h1 class="row justify-content-center ">React Dynamic Table</h1>
        <div style={{ display: "flex", marginLeft: "350px" }}>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Search"
          >
            <input
              type="text"
              id="kt_filter_search"
              className="form-control form-control-white form-control-sm w-150px ps-9"
              placeholder="Search"
              onChange={(e) => searchHandler(e.target.value)}
            />
          </div>
        </div>
        <div class="row justify-content-center mt-4 ">
          <div class="col" style={{ marginLeft: "400px" }}>
            <table className="table table-striped" style={{ width: "50%" }}>
              <thead>
                <tr>
                  <th
                    className="text-dark fw-bolder"
                    style={{ paddingLeft: "8px" }}
                    onClick={() => emailSort()}
                  >
                    Name
                    <i class="fa fa-sort" aria-hidden="true"></i>
                  </th>
                  <th
                    className="text-dark fw-bolder"
                    style={{ paddingLeft: "8px" }}
                    onClick={() => currencySort()}
                  >
                    currency
                    <i class="fa fa-sort" aria-hidden="true"></i>
                  </th>
                  <th
                    className="text-dark fw-bolder"
                    style={{ paddingLeft: "8px" }}
                    onClick={() => countrySort()}
                  >
                    country
                  </th>
                </tr>
              </thead>
              <tbody>
                {postData &&
                  postData.map((list, idx) => (
                    <tr idx={idx}>
                      <td>{list.id}</td>
                      <td>${list.min_size}</td>
                      <td>{list.name}</td>
                    </tr>
                  ))}
                <div className="main-app">
                  {/* Display all the posts */}
                  {post}

                  {/* Using React Paginate */}
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom_table;
