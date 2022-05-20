import React, { Component } from "react";
import SaveTheDateDataService from "../services/savethedate.service";
import { Link } from "react-router-dom";

export default class SaveTheDatesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchGuest = this.onChangeSearchGuest.bind(this);
    this.retrieveSaveTheDates = this.retrieveSaveTheDates.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSaveTheDate = this.setActiveSaveTheDate.bind(this);
    this.removeAllSaveTheDates = this.removeAllSaveTheDates.bind(this);
    this.searchGuest = this.searchGuest.bind(this);

    this.state = {
      savethedates: [],
      currentSaveTheDate: null,
      currentIndex: -1,
      searchGuest: ""
    };
  }

  componentDidMount() {
    this.retrieveSaveTheDates();
  }

  onChangeSearchGuest(e) {
    const searchGuest = e.target.value;

    this.setState({
      searchGuest: searchGuest
    });
  }

  retrieveSaveTheDates() {
    SaveTheDateDataService.getAll()
      .then(response => {
        this.setState({
          savethedates: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSaveTheDates();
    this.setState({
      currentSaveTheDate: null,
      currentIndex: -1
    });
  }

  setActiveSaveTheDate(savethedate, index) {
    this.setState({
      currentSaveTheDate: savethedate,
      currentIndex: index
    });
  }

  removeAllSaveTheDates() {
    SaveTheDateDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchGuest() {
    this.setState({
      currentSaveTheDate: null,
      currentIndex: -1
    });

    SaveTheDateDataService.findByGuest(this.state.searchGuest)
      .then(response => {
        this.setState({
          savethedates: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchGuest, savethedates, currentSaveTheDate, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by guest"
              value={searchGuest}
              onChange={this.onChangeSearchGuest}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchGuest}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Messages List</h4>

          <ul className="list-group">
            {savethedates &&
              savethedates.map((savethedate, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSaveTheDate(savethedate, index)}
                  key={index}
                >
                  [ {savethedate.guest} ] {savethedate.message}
                </li>
              ))}
          </ul><br></br>
          <button
            className="btn btn-sm btn-danger"
            onClick={this.removeAllSaveTheDates}
            disabled="disabled"
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSaveTheDate ? (
            <div>
              <h4>Message</h4>
              <table>
                <tr>
                  <th>Guest:</th>
                  <td>{" "} {currentSaveTheDate.guest}</td>
                </tr>
                <tr>
                  <th>Message:</th>
                  <td>{" "} {currentSaveTheDate.message}</td>
                </tr>
                <tr>
                  <th>Status:</th>
                  <td>{" "} {currentSaveTheDate.published ? "Published" : "Pending"}</td>
                </tr>
                <tr>
                  <th></th>
                  <td><Link
                      to={"/savethedates/" + currentSaveTheDate.id}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link></td>
                </tr>
              </table>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Message...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
