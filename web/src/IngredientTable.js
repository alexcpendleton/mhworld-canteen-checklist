import React, { Component } from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class IngredientTable extends Component {
  constructor(props) {
    super(props);
    this.renderFound = this.renderFound.bind(this);
    this.handleFoundChange = this.handleFoundChange.bind(this);
  }
  render() {
    const ingredients = Object.keys(this.props.ingredients).map(
      key => this.props.ingredients[key]
    );
    return (
      <div className="ingredient-table">
        <ReactTable
          data={ingredients}
          columns={[
            {
              Header: "✔",
              Cell: row => {
                const o = row.original;
                return this.renderFound(o.name, o);
              },
              accessor: "found",
              maxWidth: 50
            },
            {
              Header: "Name",
              accessor: "name",
              maxWidth: 200
            },
            {
              Header: "Type",
              accessor: "type",
              maxWidth: 100
            },
            {
              Header: "Zone",
              accessor: "zone",
              maxWidth: 140
            },
            {
              Header: "Source",
              accessor: "source",
              maxWidth: 220
            },
            {
              Header: "Notes",
              accessor: "notes",
              Cell: this.renderNotesInRow
            },
            {
              Header: "Skill",
              accessor: "skill",
              maxWidth: 120
            }
          ]}
          defaultPageSize={200}
          className="-striped -highlight"
        />
      </div>
    );
  }
  renderFound(key, ingredient) {
    return (
      <div className="found">
        <input
          name={key}
          type="checkbox"
          checked={ingredient.found}
          onChange={event => {
            this.handleFoundChange(event, key);
          }}
        />
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
  renderNotesInRow(row) {
    const o = row.original;
    if (o && o.notes) {
      return <div className="notes">{o.notes}</div>;
    }
    return "";
  }
}

export default IngredientTable;
