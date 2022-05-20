import React, { Component } from "react";
import {Helmet} from "react-helmet";
import './flipbook/css/*'

export default class FlipBook extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.render();
  }

  render() {
    return (
      <div className="list row">
            <Helmet>
                <meta charSet="utf-8" />
                <script src="/flipbook/js/flipbook.js" type="text/javascript" />
                <script type="text/javascript" src="/flipbook/extras/jquery.min.1.7.js"></script>
                <script type="text/javascript" src="/flipbook/extras/jquery-ui-1.8.20.custom.min.js"></script>
                <script type="text/javascript" src="/flipbook/extras/jquery.mousewheel.min.js"></script>
                <script type="text/javascript" src="/flipbook/extras/modernizr.2.5.3.min.js"></script>
                <script type="text/javascript" src="/flipbook/lib/hash.js"></script>
            </Helmet>
            <div id="canvas">
            <div id="book-zoom">
              <div class="sample-docs">
                <div ignore="1" class="tabs"><div class="left">  </div> <div class="right"> </div></div>
                <div class="hard"></div>
                <div class="hard"></div>
                <div class="hard p29"></div>
                <div class="hard p30"></div>
              </div>
            </div>
            <div id="slider-bar" class="turnjs-slider">
              <div id="slider"></div>
            </div>
          </div>
      </div>
    );
  }
}
