import React, { Component } from "react";
import "./App.css";
import GameView from "./GameView";
import IngredientTable from "./IngredientTable";
import ZoneView from "./ZoneView";
import rawIngredients from "./data/ingredients.json";
import { Tabs, TabItem, TabPanel, TabsContent } from "react-foundation";
import "foundation-sites/dist/css/foundation.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loading: false,
      ingredients: [],
      activeTab: "category"
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.deriveButtonClass = this.deriveButtonClass.bind(this);
    this.storage = {
      changeOne: (key, value) => {
        let all = JSON.parse(localStorage.getItem("found"));
        if (!all) {
          all = {};
        }
        if (value) {
          all[key] = value;
        } else {
          delete all[key];
        }
        localStorage.setItem("found", JSON.stringify(all));
      },
      load: ingredients => {
        let all = JSON.parse(localStorage.getItem("found"));
        if (!all) {
          all = {};
          localStorage.setItem("found", "{}");
        }
        return all;
      }
    };
  }
  deriveButtonClass(isActive) {
    const type = isActive ? "primary" : "clear";
    return `${type} button`;
  }
  render() {
    const ingredients = this.state.ingredients;
    const isCategoryActive = this.state.activeTab === "category";
    const isZoneActive = this.state.activeTab === "zone";
    const isAllActive = this.state.activeTab === "all";
    return (
      <div className="App">
        <h1>
          <abbr title="Monster Hunter World">MHW</abbr> Canteen Checklist
        </h1>
        <nav className="menu align-center">
          <Tabs>
            <TabItem isActive={isCategoryActive}>
              <button
                className={this.deriveButtonClass(isCategoryActive)}
                onClick={() => this.selectTab("category")}
              >
                By Category
              </button>
            </TabItem>
            <TabItem isActive={isZoneActive}>
              <button
                className={this.deriveButtonClass(isZoneActive)}
                onClick={() => this.selectTab("zone")}
              >
                By Zone
              </button>
            </TabItem>
            <TabItem isActive={isAllActive}>
              <button
                className={this.deriveButtonClass(isAllActive)}
                onClick={() => this.selectTab("all")}
              >
                All
              </button>
            </TabItem>
          </Tabs>
        </nav>
        <TabsContent className="align-center">
          <TabPanel isActive={isCategoryActive}>
            <GameView
              ingredients={ingredients}
              onFoundChange={this.handleFoundChange}
            />
          </TabPanel>
          <TabPanel isActive={isZoneActive}>
            <ZoneView
              ingredients={ingredients}
              onFoundChange={this.handleFoundChange}
            />
          </TabPanel>
          <TabPanel isActive={isAllActive}>
            <IngredientTable
              ingredients={ingredients}
              onFoundChange={this.handleFoundChange}
            />
          </TabPanel>
        </TabsContent>
        <section class="credits">
          <p>
            Most information was compiled from the{" "}
            <a href="https://monsterhunterworld.wiki.fextralife.com/Canteen">
              Fextralife Wiki
            </a>,{" "}
            <a href="https://docs.google.com/spreadsheets/d/1XYvKOMGIgpoWHEyJF9o6_IVx8dpTOPRFf17DxjAnCYc/edit#gid=914380646">
              liarea's spreadsheet
            </a>, and through gameplay.
          </p>
          <p>
            Ingredients often link to further details on the Wiki. You'll want
            to use those especially for the unique flourishing/upsurge node
            locations.
          </p>
          <p>
            Feel free to e-mail feedback and corrections to{" "}
            <a href="mailto:vespoids@pondryhills.com?subject=MHW+Canteen+Checklist+Feedback">
              vespoids@pondryhills.com
            </a>{" "}
            or submit a{" "}
            <a href="https://github.com/alexcpendleton/mhworld-canteen-checklist">
              Github issue
            </a>.
          </p>
        </section>
      </div>
    );
  }
  componentDidMount() {
    this.loadData();
  }
  selectTab(tabId) {
    if (this.state.tabId === tabId) return;
    this.setState({ activeTab: tabId });
  }

  async loadData() {
    this.setState({
      loading: true
    });
    const output = {};
    const found = await this.loadFound();

    for (const key in rawIngredients) {
      let item = Object.assign({}, rawIngredients[key]);
      if (item.source == "Starter") {
        found[key] = true;
      }
      item.found = found[key] != null;

      output[key] = item;
    }

    this.setState({
      loading: false,
      loaded: true,
      ingredients: output
    });
  }
  async loadFound() {
    return this.storage.load();
  }
  handleFoundChange(key, found) {
    // this seems wrong, but works
    this.state.ingredients[key].found = found;
    this.setState({
      ingredients: this.state.ingredients
    });
    this.storage.changeOne(key, found);
  }
}

export default App;
