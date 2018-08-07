import React, { Component } from "react";

export class Shill extends Component {
  render() {
    if (!this.props.shill) return "";
    return (
      <p class="shill">
        You may also{" "}
        <a
          href="https://www.buymeacoffee.com/M5QgpPWJ0"
          target="_blank"
          className=""
          rel="noopener noreferrer"
        >
          buy me a coffee
        </a>{" "}
        if you're able and feeling generous. :)
      </p>
    );
  }
}
