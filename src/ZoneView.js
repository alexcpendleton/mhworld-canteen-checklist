import React, { Component } from "react";
import { Notes } from "./Notes";
import { Tabs, TabItem, TabPanel, TabsContent } from "react-foundation";

class IngredientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Ancient Forest"
    };
    this.renderOne = this.renderOne.bind(this);
    this.renderZone = this.renderZone.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.renderTabItemFor = this.renderTabItemFor.bind(this);
    this.deriveButtonClass = this.deriveButtonClass.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }
  render() {
    const orderedZones = [
      "Ancient Forest",
      "Wildspire Waste",
      "Coral Highlands",
      "Rotten Vale",
      "Elder's Recess"
    ];
    const byZone = orderedZones.reduce((target, name) => {
      target[name] = [];
      return target;
    }, {});
    Object.keys(this.props.ingredients).forEach(key => {
      const ingredient = this.props.ingredients[key];
      const zone = ingredient.zone;
      if (byZone[zone]) {
        byZone[zone].push(ingredient);
      }
    });

    return (
      <div>
        <nav class="menu align-center">
          <Tabs>{orderedZones.map(this.renderTabItemFor)}</Tabs>
        </nav>
        <TabsContent>
          {orderedZones.map(name => this.renderZone(name, byZone[name]))}
        </TabsContent>
      </div>
    );
  }
  deriveButtonClass(isActive) {
    const type = isActive ? "secondary" : "clear";
    return `${type} button`;
  }
  renderTabItemFor(zoneName) {
    const isActive = this.state.activeTab === zoneName;
    const buttonClass = this.deriveButtonClass(isActive);
    return (
      <TabItem isActive={isActive} key={zoneName}>
        <button
          className={buttonClass}
          onClick={() => this.selectTab(zoneName)}
        >
          {zoneName}
        </button>
      </TabItem>
    );
  }
  renderZone(name, ingredients) {
    const isActive = this.state.activeTab === name;
    return (
      <TabPanel isActive={isActive} key={name}>
        <div className="single-zone">
          <table>
            <tbody>
              {ingredients.map(i => this.renderOne(i.name, i, name))}
            </tbody>
          </table>
        </div>
      </TabPanel>
    );
  }
  renderOne(key, ingredient, zone) {
    const foundClass = ingredient.found ? "found" : "not-found";
    let notes = <Notes ingredient={ingredient} />;
    return (
      <tr key={key} className={foundClass}>
        <td className="found-column">
          {this.renderFound(key, ingredient, zone)}
        </td>
        <td>{ingredient.name}</td>
        <td>{ingredient.source}</td>
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
  selectTab(tabId) {
    if (this.state.tabId === tabId) return;
    this.setState({ activeTab: tabId });
  }
}

export default IngredientTable;
