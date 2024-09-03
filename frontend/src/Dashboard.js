import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Sector, Cell
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/insights')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  const filteredData = data.filter(item => {
    return (
      (!filters.end_year || item.end_year.includes(filters.end_year)) &&
      (!filters.topic || item.topic.includes(filters.topic)) &&
      (!filters.sector || item.sector.includes(filters.sector)) &&
      (!filters.region || item.region.includes(filters.region)) &&
      (!filters.pestle || item.pestle.includes(filters.pestle)) &&
      (!filters.source || item.source.includes(filters.source)) &&
      (!filters.country || item.country.includes(filters.country)) &&
      (!filters.city || item.city.includes(filters.city))
    );
  });
  return (
    <div>
    <div style={{backgroundColor:"black"}}>  <h1 style={{textAlign:"center",color:"white"}}>Data Visualization Dashboard</h1></div>
      <div>
        <label>
          End Year:
          <input type="text" name="end_year" value={filters.end_year} onChange={handleFilterChange} />
        </label>
        <label>
          Topic:
          <input type="text" name="topic" value={filters.topic} onChange={handleFilterChange} />
        </label>
        <label>
          Sector:
          <input type="text" name="sector" value={filters.sector} onChange={handleFilterChange} />
        </label>
        <label>
          Region:
          <input type="text" name="region" value={filters.region} onChange={handleFilterChange} />
        </label>
        <label>
          PESTLE:
          <input type="text" name="pestle" value={filters.pestle} onChange={handleFilterChange} />
        </label>
        <label>
          Source:
          <input type="text" name="source" value={filters.source} onChange={handleFilterChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={filters.country} onChange={handleFilterChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
        </label>
      </div>
      <div style={{display:"flex"}}>
      <div>
        <h2>Bar Chart: Intensity and Likelihood</h2>
        <BarChart
          width={900}
          height={400}
          data={filteredData}
          margin={{ top: 20, right: 30, bottom: 5, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" fill="#8884d8" />
          <Bar dataKey="likelihood" fill="#82ca9d" />
        </BarChart>
      </div>
      <div style={{display:'flex'}}>
      <div>
        <h2>Pie Chart: Intensity Distribution by Topic</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={filteredData}
            dataKey="intensity"
            nameKey="topic"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.intensity > 6 ? 'red' : 'blue'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div>
        <h2>Pie Chart: Likelihood Distribution by Topic</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={filteredData}
            dataKey="likelihood"
            nameKey="topic"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.likelihood > 2 ? 'orange' : 'blue'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
