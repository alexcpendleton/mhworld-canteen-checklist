import React, { Component } from "react";
import "./App.css";
import GameView from "./GameView";
import IngredientTable from "./IngredientTable";
import ZoneView from "./ZoneView";
import rawIngredients from "./data/ingredients.json";
import { Shill } from "./Shill";
import { Tabs, TabItem, TabPanel, TabsContent } from "react-foundation";
import "foundation-sites/dist/css/foundation.min.css";
import "./Dark.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loading: false,
      ingredients: [],
      activeTab: "category",
      theme: ""
    };
    this.darkThemeName = "theme-dark";
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.deriveButtonClass = this.deriveButtonClass.bind(this);
    this.loadTheme = this.loadTheme.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.applyTheme = this.applyTheme.bind(this);
    this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
    this.isUsingDarkTheme = this.isUsingDarkTheme.bind(this);
    this.renderThemeButton = this.renderThemeButton.bind(this);
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
    const appClass = `App`;
    return (
      <div className={appClass}>
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
        <section className="credits">
          <p>
            This lets you keep track of what Canteen Ingredients you have, and
            which ones you still need in Monster Hunter World. While not exactly
            a guide, it does have some help and links to more in-depth
            information. I used it to find the right Investigations for
            ingredients, and to maximize my results per-zone whenever possible.
          </p>
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
          <Shill shill={this.props.shill} />
          {this.renderThemeButton()}
        </section>
      </div>
    );
  }
  componentDidMount() {
    this.loadTheme();
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
      if (item.source === "Starter") {
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
    const ingredients = this.state.ingredients;
    ingredients[key].found = found;
    this.setState({ ingredients });
    this.storage.changeOne(key, found);
  }
  loadTheme() {
    let theme = localStorage.getItem("theme");
    this.setTheme(theme);
  }
  setTheme(theme) {
    this.setState({ theme }, function() {
      localStorage.setItem("theme", theme);
      this.applyTheme(theme);
    });
  }
  applyTheme(theme) {
    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.remove([this.darkThemeName]);
    }
  }
  toggleDarkTheme() {
    let newThemeName = "";
    if (!this.isUsingDarkTheme()) {
      newThemeName = this.darkThemeName;
    }
    this.setTheme(newThemeName);
  }
  isUsingDarkTheme() {
    return this.state.theme === this.darkThemeName;
  }
  renderThemeButton() {
    const text = this.isUsingDarkTheme() ? "Light Theme" : "Dark Theme";
    return (
      <button className="primary button" onClick={() => this.toggleDarkTheme()}>
        {text}
      </button>
    );
  }
}

export default App;
