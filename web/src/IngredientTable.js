import React, { Component } from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class IngredientTable extends Component {
  constructor(props) {
    super(props);
    this.renderOne = this.renderOne.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
  }
  render() {
    const ingredients = Object.keys(this.props.ingredients).map(
      key => this.props.ingredients[key]
    );
    return (
      <ReactTable
        data={ingredients}
        columns={[
          {
            Header: "Found",
            Cell: row => {
              const o = row.original;
              return this.renderFound(o.name, o);
            }
          },
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Type",
            accessor: "type"
          },
          {
            Header: "Zone",
            accessor: "zone"
          },
          {
            Header: "Source",
            accessor: "source"
          },
          {
            Header: "Notes",
            accessor: "notes"
          },
          {
            Header: "Skill",
            accessor: "skill"
          }
        ]}
        defaultPageSize={200}
        className="-striped -highlight"
      />
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

export default IngredientTable;
