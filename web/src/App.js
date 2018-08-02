import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GameView from "./GameView";
import IngredientTable from "./IngredientTable";
import ZoneView from "./ZoneView";
import rawIngredients from "./data/ingredients.json";
import "foundation-sites/dist/css/foundation.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loading: false,
      ingredients: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
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
  render() {
    const ingredients = this.state.ingredients;
    return (
      <div className="App">
        <GameView
          ingredients={ingredients}
          onFoundChange={this.handleFoundChange}
        />
        <ZoneView
          ingredients={ingredients}
          onFoundChange={this.handleFoundChange}
        />
        <IngredientTable
          ingredients={ingredients}
          onFoundChange={this.handleFoundChange}
        />
      </div>
    );
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({
      loading: true
    });
    const output = {};
    const found = await this.loadFound();

    for (const key in rawIngredients) {
      let item = Object.assign({}, rawIngredients[key]);
      console.log(item);
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