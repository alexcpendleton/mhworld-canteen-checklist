import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GameView from "./GameView";
import IngredientTable from "./IngredientTable";
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
  }
  render() {
    const ingredients = this.state.ingredients;
    return (
      <div className="App">
        <GameView
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
    // Give back an object with the keys of the previously-found ingredients. For now just assume none, soon load this from localstorage/database
    return {};
  }
  handleFoundChange(key, found) {
    // this seems wrong, but works
    this.state.ingredients[key].found = found;
    this.setState({
      ingredients: this.state.ingredients
    });
  }
}

export default App;
