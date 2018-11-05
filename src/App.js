import React, { Component } from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';

import PieChartContainer from './PieChartContainer';

import nutrition from './nutrition.json';

import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const initialFilter = {
      logic: 'and',
      filters: [{
        field: 'Description',
        operator: 'contains',
        value: 'Apple'
      }]
    };
    this.state = {
      data: this.getNutrition(initialFilter),
      filter: initialFilter,
      habitId: 0,
      habitName: '',
      habitIteration: 0,
      habits: [],
      habitsOptions: [
        'Drink 1 cup of water',
        '1 Hour of Coding',
        '10 pushups',
        'Eat Your Fruits and veggies',
        '1 hour of Reading',
        '10 minutes of Meditation',
      ],
      series: [{ data: [1, 1, 1] }],
      seriesDefaults: { type: 'pie' },
      graphProtein: 0,
      graphCarb: 0,
      graphSugar: 0
    }

  }

  // habit functions
  handleNameChange = (event) => {
    this.setState({ habitName: event.target.value })
  }
  handleIterationChange = (event) => {
    this.setState({ habitIteration: event.target.value })
  }
  handleAddHabit = () => {
    this.setState({
      habits: this.state.habits.concat([{
        key: this.state.habitId,
        name: this.state.habitName,
        iterations: this.state.habitIteration
      }]),
      habitId: this.habitId++
    });
  }

  // Grid functions
  handleFilterChange = (event) => {
    this.setState({
      data: this.getNutrition(event.filter),
      filter: event.filter
    });
  }
  getNutrition = (filter) => filterBy(nutrition, filter);


  handleProteinChange = (event) => {
    this.setState({ graphProtein: event.target.value }, this.handleGraphChange());
  }
  handleCarbChange = (event) => {
    this.setState({ graphCarb: event.target.value }, this.handleGraphChange());
  }
  handleSugarChange = (event) => {
    this.setState({ graphSugar: event.target.value }, this.handleGraphChange());
  }
  handleGraphChange = () => {
    this.setState({
      series: [{
        data: [
          this.state.graphProtein,
          this.state.graphCarb,
          this.state.graphSugar
        ]
      }]
    });
  }

  render() {
    return (
      <div className="App" >
        <h1>Healthy Things</h1>
        <div className='healthy-habits'>
          <ul key='all-habits'>
            {this.state.habits.map((habit) => [
              <li key={habit.key}>
                <h3>{habit.name}</h3>
                <div className='iterations-area'>
                  {[...Array(habit.iterations)].map((iteration, index) => {
                    return <input key={index} type='radio' />
                  })}
                </div>
              </li>
            ])}
          </ul>
        </div>
        <div className='add-habits'>
          <DropDownList
            data={this.state.habitsOptions}
            value={this.state.habitName}
            onChange={this.handleNameChange} />
          <NumericTextBox
            format='0'
            min={0}
            max={22}
            value={this.state.habitIteration}
            onChange={this.handleIterationChange} />
          <Button primary={true} onClick={this.handleAddHabit}>Add Habit</Button>
        </div>
        <div className='nutrition-grid'>
          <Grid data={this.state.data} style={{ maxHeight: '500px' }}
            filterable filter={this.state.filter}
            onFilterChange={this.handleFilterChange}>
            <GridColumn field='Description' title='Food' />
            <GridColumn field='Measure' title='Amount' />
            <GridColumn field='Protein(g)Per Measure' title='Protein' />
            <GridColumn field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
            <GridColumn field='Sugars, total(g)Per Measure' title='Sugars' />
          </Grid>
          
          <PieChartContainer />

        </div>
      </div >
    );
  }
}

export default App;
