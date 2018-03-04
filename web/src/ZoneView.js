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
          <tbody>{ingredients.map(i => this.renderOne(i.name, i))}</tbody>
        </table>
      </div>
    );
  }
  renderOne(key, ingredient) {
    const foundClass = ingredient.found ? "found" : "not-found";
    return (
      <tr key={key} className={foundClass}>
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

export default IngredientTable;
