import React, { useState } from "react";
import styles from "./Search.module.css";
import axios from "axios";
import PlanetCard from "../../components/planetCard/PlanetCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { Redirect } from "react-router-dom";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  let cancel = "";

  // fetch search results
  const fetchSearchResults = (query) => {
    const searchUrl = `api/planets/?search=${query}`;
    if (cancel) {
      cancel.cancel();
    }

    cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: cancel.token,
      })
      .then((res) => {
        if (query.length > 0) {
          setResults(res.data.results);
          setLoading(false);
        }
        if (!res.data.results.length || !query.length) {
          setResults([]);
          setMessage("No more search results, Please try new Search");
          setLoading(false);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          setLoading(false);
          setMessage("Failed to get the data!!");
        }
      });
  };

  // to get number based on value
  const intToString = (value) => {
    const width = {
      k: 25,
      m: 50,
      b: 75,
      t: 100,
    };
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2
      )
    );
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }

    return width[suffixes[suffixNum]];
  };

  // handle input on seach
  const handleOnInputChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    setLoading(true);
    setMessage("");
    fetchSearchResults(query);
  };

  // render the search results
  const renderSearchResults = () => {
    if (results && results.length) {
      return (
        <div>
          {results.map((result) => {
            return (
              <PlanetCard
                key={result.edited}
                name={result.name}
                population={result.population}
                width={intToString(result.population)}
              ></PlanetCard>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
        {/* can be better in container so that the code can be replaced with that container */}
      {!props.isAuthenticated ? <Redirect to="/" /> : null}
      <div className={styles.username}>Welcome {props.username}</div>
      {/*Heading*/}
      <div className={styles.headingContainer}>
        <h3 className={styles.heading}>Search Planets here</h3>
        <Button btnType="success" disabled={false} clicked={props.logout}>
          SIGN OUT
        </Button>
      </div>
      {/*Search Input*/}
      <label className={styles.searchlabel} htmlFor="search-input">
        <input
          type="text"
          value={query}
          id="search-input"
          placeholder="Search Planets"
          onChange={handleOnInputChange}
        />
      </label>
      {message !== "" && <p>{message}</p>}
      {loading && <Spinner />}
      {renderSearchResults()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated !== null,
    username: state.auth.username,
    searchCount: state.auth.searchCount,
    timeLimit: state.auth.timeLimit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
