import React, { Component } from "react";
class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.renderOne = this.renderOne.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
  }
  render() {
    const ingredients = this.props.ingredients;
    return (
      <table>
        <thead>
          <tr>
            <th>✔</th>
            <th>Name</th>
            <th>Type</th>
            <th>Skill</th>
            <th>Zone</th>
            <th>Source</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(ingredients).map(key =>
            this.renderOne(key, ingredients[key])
          )}
        </tbody>
      </table>
    );
  }
  renderOne(key, ingredient) {
    return (
      <tr key={key}>
        <td>{this.renderFound(key, ingredient)}</td>
        <td>{ingredient.name}</td>
        <td>{ingredient.type}</td>
        <td>{ingredient.skill}</td>
        <td>{ingredient.zone}</td>
        <td>{ingredient.source}</td>
        <td>{ingredient.notes}</td>
      </tr>
    );
  }
  renderFound(key, ingredient) {
    return (
      <input
        name={key}
        type="checkbox"
        checked={ingredient.found}
        onChange={event => {
          this.handleFoundChange(event, key);
        }}
      />
    );
  }
  handleFoundChange(event, key) {
    const target = event.target;
    const found = target.checked;
    if (this.props.onFoundChange) {
      this.props.onFoundChange(key, found);
    }
  }
}

export default IngredientList;
