import React, { Component } from "react";
import "foundation-sites/dist/css/foundation.min.css";

class GameView extends Component {
  constructor(props) {
    super(props);
    this.renderOne = this.renderOne.bind(this);
    this.renderType = this.renderType.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
  }
  render() {
    if (!this.props.ingredients) {
      return "";
    }
    const categorized = {
      Meat: [],
      Vegetable: [],
      Drink: [],
      Fish: []
    };
    Object.keys(this.props.ingredients).forEach(key => {
      const item = this.props.ingredients[key];
      categorized[item.type].push(item);
    });
    return (
      <div>
        <div className="tabs" data-tabs>
          {this.renderType("Meat", categorized["Meat"])}
          {this.renderType("Fish", categorized["Fish"])}
          {this.renderType("Vegetable", categorized["Vegetable"])}
          {this.renderType("Drink", categorized["Drink"])}
        </div>
      </div>
    );
  }
  renderType(name, ingredientsOfType) {
    const divvied = {};
    for (const key in ingredientsOfType) {
      const element = ingredientsOfType[key];
      const skill = element.skill;
      if (!divvied[skill]) {
        divvied[skill] = [];
      }
      divvied[skill].push(element);
    }

    return (
      <div className="food-type grid-container" key={name}>
        <h3>{name}</h3>
        <div className="grid-x ">
          {Object.keys(divvied).map(i => this.renderSkillRow(i, divvied[i]))}
        </div>
      </div>
    );
  }
  renderSkillRow(name, skillRow) {
    return skillRow.map(this.renderOne);
  }
  renderOne(ingredient) {
    const key = ingredient.name;
    return (
      <div className="ingredient game-view-ingredient cell small-2" key={key}>
        <label htmlFor={key}>
          <input
            id={key}
            name={key}
            type="checkbox"
            checked={ingredient.found}
            onChange={event => {
              this.handleFoundChange(event, key);
            }}
          />
          {ingredient.name}
        </label>
      </div>
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

GameView.defaultProps = {
  rowSize: 6
};
export default GameView;
