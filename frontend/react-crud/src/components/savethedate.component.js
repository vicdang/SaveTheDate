import React, { Component } from "react";
import SaveTheDateDataService from "../services/savethedate.service";

export default class SaveTheDate extends Component {
  constructor(props) {
    super(props);
    this.onChangeGuest = this.onChangeGuest.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.getSaveTheDate = this.getSaveTheDate.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSaveTheDate = this.updateSaveTheDate.bind(this);
    this.deleteSaveTheDate = this.deleteSaveTheDate.bind(this);

    this.state = {
      currentSaveTheDate: {
        id: null,
        guest: "",
        message: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSaveTheDate(this.props.match.params.id);
  }

  onChangeGuest(e) {
    const guest = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSaveTheDate: {
          ...prevState.currentSaveTheDate,
          guest: guest
        }
      };
    });
  }

  onChangeMessage(e) {
    const message = e.target.value;
    
    this.setState(prevState => ({
      currentSaveTheDate: {
        ...prevState.currentSaveTheDate,
        message: message
      }
    }));
  }

  getSaveTheDate(id) {
    SaveTheDateDataService.get(id)
      .then(response => {
        this.setState({
          currentSaveTheDate: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSaveTheDate.id,
      guest: this.state.currentSaveTheDate.guest,
      message: this.state.currentSaveTheDate.message,
      published: status
    };

    SaveTheDateDataService.update(this.state.currentSaveTheDate.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSaveTheDate: {
            ...prevState.currentSaveTheDate,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSaveTheDate() {
    SaveTheDateDataService.update(
      this.state.currentSaveTheDate.id,
      this.state.currentSaveTheDate
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The savethedate was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSaveTheDate() {    
    SaveTheDateDataService.delete(this.state.currentSaveTheDate.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/savethedates')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSaveTheDate } = this.state;

    return (
      <div>
        {currentSaveTheDate ? (
          <div className="edit-form">
            <h4>SaveTheDate</h4>
            <form>
              <div className="form-group">
                <label htmlFor="guest">Guest</label>
                <input
                  type="text"
                  className="form-control"
                  id="guest"
                  value={currentSaveTheDate.guest}
                  onChange={this.onChangeGuest}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  value={currentSaveTheDate.message}
                  onChange={this.onChangeMessage}
                />
              </div><br></br>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSaveTheDate.published ? "Published" : "Pending"}
              </div>
            </form><br></br>

            {currentSaveTheDate.published ? (
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-danger btn-sm mr-2"
              onClick={this.deleteSaveTheDate}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success btn-sm"
              onClick={this.updateSaveTheDate}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Message...</p>
          </div>
        )}
      </div>
    );
  }
}
