import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TableSummary() {
  const [summaryData, setSummaryData] = useState({
    destinations: [],
    tourPackages: [],
    bookings: [],
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/summary/');
        setSummaryData(data);
      } catch (error) {
        console.error('Failed to fetch summary data', error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div>
      <h1>Overall Statistics</h1>

      <div className="data-table">
        <div className="titles">
          <h1>Latest Payments</h1>
          <div className="title-actions">
            <Link to="/payments">View All</Link>
          </div>
        </div>

        <table cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.userId}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table">
        <div className="titles">
          <h1>Last Added Destinations</h1>
        </div>

        <table cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.destinations.map((destination, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{destination.title}</td>
                <td>{destination.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table">
        <div className="titles">
          <h1>Last Added Tour Packages</h1>
        </div>

        <table cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.tourPackages.map((tourPackage, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tourPackage.name}</td>
                <td>{tourPackage.price}</td>
                <td>{tourPackage.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSummary;
