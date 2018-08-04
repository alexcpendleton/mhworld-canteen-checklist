import React, { Component } from "react";

export class Notes extends Component {
  render() {
    const ingredient = this.props.ingredient;
    let notes = ingredient.notes;
    if (!notes) return null;
    if (ingredient.link) {
      notes = (
        <a href={ingredient.link} target="_blank">
          {notes}
        </a>
      );
    }
    return <span className="notes">{notes}</span>;
  }
}
