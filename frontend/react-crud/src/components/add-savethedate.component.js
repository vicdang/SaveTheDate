import React, { Component } from "react";
import SaveTheDateDataService from "../services/savethedate.service";

export default class AddSaveTheDate extends Component {
  constructor(props) {
    super(props);
    this.onChangeGuest = this.onChangeGuest.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.saveSaveTheDate = this.saveSaveTheDate.bind(this);
    this.newSaveTheDate = this.newSaveTheDate.bind(this);

    this.state = {
      id: null,
      guest: "",
      message: "", 
      published: false,
      submitted: false
    };
  }

  onChangeGuest(e) {
    this.setState({
      guest: e.target.value
    });
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  saveSaveTheDate() {
    var data = {
      guest: this.state.guest,
      message: this.state.message
    };

    SaveTheDateDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          guest: response.data.guest,
          message: response.data.message,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSaveTheDate() {
    this.setState({
      id: null,
      guest: "",
      message: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSaveTheDate}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="guest">Guest</label>
              <input
                type="text"
                className="form-control"
                id="guest"
                required
                value={this.state.guest}
                onChange={this.onChangeGuest}
                name="guest"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                className="form-control"
                id="message"
                required
                value={this.state.message}
                onChange={this.onChangeMessage}
                name="message"
              />
            </div><br></br>

            <button onClick={this.saveSaveTheDate} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
