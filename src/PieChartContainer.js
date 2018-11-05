// Functional Component Example:  
import React, { useState } from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartLegend } from '@progress/kendo-react-charts';
import 'hammerjs';

export default function PieChartContainer() {
  const [graphProtein, setGraphProtein] = useState(5);
  const [graphCarbs, setGraphCarbs] = useState(5);
  const [graphSugars, setGraphSugars] = useState(5);
  const seriesDefaults = { type: 'pie' };
  const series = [
    { category: 'Protein', value: graphProtein },
    { category: 'Carbs', value: graphCarbs },
    { category: 'Sugars', value: graphSugars}
  ];

  const handleGraphProteinChange = (e) => {
    setGraphProtein(isNaN(e.target.value) ? 0 : e.target.value)
  }
  const handleGraphCarbsChange = (e) => {
    setGraphCarbs(isNaN(e.target.value) ? 0 : e.target.value)
  }
  const handleGraphSugarsChange = (e) => {
    setGraphSugars(isNaN(e.target.value) ? 0 : e.target.value)
  }

  return (
    <div>
      <div className="food-graph-inputs">
        <p>Protein Amount: -
        <input value={graphProtein} onChange={handleGraphProteinChange} />
        </p>
        <p>Carb Amount: -
        <input value={graphCarbs} onChange={handleGraphCarbsChange} />
        </p>
        <p>Sugar Amount: -
        <input value={graphSugars} onChange={handleGraphSugarsChange} />
        </p>
      </div>
      <div className="food-graph">
        <Chart seriesDefaults={seriesDefaults} seriesColors={['orange', '#ffb', 'ccc']}>
        <ChartLegend position="top" />
          <ChartSeries>
            <ChartSeriesItem type="pie" data={series} field="value" categoryField="category" />
          </ChartSeries>
        </Chart>
      </div>
    </div>
  );
}