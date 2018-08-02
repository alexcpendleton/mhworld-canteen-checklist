import React, { Component } from "react";

class IngredientTable extends Component {
  constructor(props) {
    super(props);
    this.renderOne = this.renderOne.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
  }
  render() {
    const byZone = {
      "Ancient Forest": [],
      "Wildspire Waste": [],
      "Coral Highlands": [],
      "Rotten Vale": [],
      "Elder's Recess": []
    };
    Object.keys(this.props.ingredients).forEach(key => {
      const ingredient = this.props.ingredients[key];
      const zone = ingredient.zone;
      if (byZone[zone]) {
        byZone[zone].push(ingredient);
      }
    });

    return (
      <div>
        {this.renderZone("Ancient Forest", byZone["Ancient Forest"])}
        {this.renderZone("Wildspire Waste", byZone["Wildspire Waste"])}
        {this.renderZone("Coral Highlands", byZone["Coral Highlands"])}
        {this.renderZone("Rotten Vale", byZone["Rotten Vale"])}
        {this.renderZone("Elder's Recess", byZone["Elder's Recess"])}
      </div>
    );
  }
  renderZone(name, ingredients) {
    return (
      <div key={name} className="single-zone">
        <h3>{name}</h3>
        <table>
          <tbody>{ingredients.map(i => this.renderOne(i.name, i, name))}</tbody>
        </table>
      </div>
    );
  }
  renderOne(key, ingredient, zone) {
    const foundClass = ingredient.found ? "found" : "not-found";
    let notes = ingredient.notes;
    if (ingredient.link) {
      notes = (
        <a href={ingredient.link} target="_blank">
          {ingredient.notes}
        </a>
      );
    }
    return (
      <tr key={key} className={foundClass}>
        <td className="found-column">
          {this.renderFound(key, ingredient, zone)}
        </td>
        <td>{ingredient.name}</td>
        <td>{notes}</td>
      </tr>
    );
  }
  renderFound(key, ingredient, zone) {
    const id = zone + key;
    return (
      <label htmlFor={id}>
        <input
          name={id}
          id={id}
          type="checkbox"
          checked={ingredient.found}
          onChange={event => {
            this.handleFoundChange(event, key);
          }}
        />
      </label>
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

export default IngredientTable;
