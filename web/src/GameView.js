import React, { Component } from "react";
import { Tabs, TabItem, TabPanel, TabsContent } from "react-foundation";
import { Notes } from "./Notes";
class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Meat"
    };
    this.renderOne = this.renderOne.bind(this);
    this.renderType = this.renderType.bind(this);
    this.deriveButtonClass = this.deriveButtonClass.bind(this);
    this.renderTabItemFor = this.renderTabItemFor.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderZoneSource = this.renderZoneSource.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
    this.selectTab = this.selectTab.bind(this);
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
    const orderedTypes = ["Meat", "Fish", "Vegetable", "Drink"];
    return (
      <div>
        <nav className="menu align-center">
          <Tabs>{orderedTypes.map(this.renderTabItemFor)}</Tabs>
        </nav>
        <TabsContent>
          {orderedTypes.map(type => this.renderType(type, categorized[type]))}
        </TabsContent>
      </div>
    );
  }
  deriveButtonClass(isActive) {
    const type = isActive ? "secondary" : "clear";
    return `${type} button`;
  }
  renderTabItemFor(type) {
    const isActive = this.state.activeTab === type;
    const buttonClass = this.deriveButtonClass(isActive);
    return (
      <TabItem isActive={isActive} key={type}>
        <button className={buttonClass} onClick={() => this.selectTab(type)}>
          {type}
        </button>
      </TabItem>
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
    const isActive = this.state.activeTab === name;

    return (
      <TabPanel isActive={isActive} key={name}>
        <div className="food-type grid-container">
          <div className="grid-x ">
            {Object.keys(divvied).map(i => this.renderSkillRow(i, divvied[i]))}
          </div>
        </div>
      </TabPanel>
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
        </label>
        <div className="name">{ingredient.name}</div>
        {this.renderDetails(ingredient)}
      </div>
    );
  }
  renderDetails(ingredient) {
    if (!ingredient.zone && !ingredient.source && !ingredient.notes) {
      return null;
    }
    return (
      <div class="details">
        <div class="zone-source">{this.renderZoneSource(ingredient)}</div>
        <Notes ingredient={ingredient} />
      </div>
    );
  }
  renderZoneSource(ingredient) {
    const parts = [];
    if (ingredient.zone) {
      parts.push(ingredient.zone);
    }
    if (ingredient.source) {
      parts.push(ingredient.source);
    }
    return parts.join(" - ");
  }
  handleFoundChange(event, key) {
    const target = event.target;
    const found = target.checked;
    if (this.props.onFoundChange) {
      this.props.onFoundChange(key, found);
    }
  }
  selectTab(tabId) {
    if (this.state.tabId === tabId) return;
    this.setState({ activeTab: tabId });
  }
}

GameView.defaultProps = {
  rowSize: 6
};
export default GameView;
