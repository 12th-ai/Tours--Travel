import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';

function Summary() {
  const [summary, setSummary] = useState({ totalUsers: 0 });

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/summary');
        setSummary(response.data.data);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div>
    <h1>Overall Statistics</h1>
    <div className="data-cards">
      <a href="" className="data-card">
        <h1>Total Users</h1>
        <p>{summary.totalUsers}</p>
        <div className="icon push">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><path d="M8.5 6C6.5850452 6 5 7.5850452 5 9.5L5 26.5C5 28.414955 6.5850452 30 8.5 30L39.5 30C41.414955 30 43 28.414955 43 26.5L43 9.5C43 7.5850452 41.414955 6 39.5 6L8.5 6 z M 11 9L37 9C37 10.66 38.34 12 40 12L40 24C38.34 24 37 25.34 37 27L11 27C11 25.34 9.66 24 8 24L8 12C9.66 12 11 10.66 11 9 z M 24 11C22.041667 11 20.395258 11.984107 19.412109 13.335938C18.428961 14.687767 18 16.352273 18 18C18 19.647727 18.428961 21.312233 19.412109 22.664062C20.395258 24.015893 22.041667 25 24 25C25.958333 25 27.604742 24.015894 28.587891 22.664062C29.571039 21.312233 30 19.647727 30 18C30 16.352273 29.571039 14.687767 28.587891 13.335938C27.604742 11.984106 25.958333 11 24 11 z M 24 14C25.041666 14 25.645259 14.390893 26.162109 15.101562C26.67896 15.812233 27 16.897727 27 18C27 19.102273 26.67896 20.187767 26.162109 20.898438C25.645259 21.609107 25.041666 22 24 22C22.958334 22 22.354741 21.609106 21.837891 20.898438C21.32104 20.187767 21 19.102273 21 18C21 16.897727 21.32104 15.812232 21.837891 15.101562C22.354741 14.390894 22.958334 14 24 14 z M 12 16 A 2 2 0 0 0 12 20 A 2 2 0 0 0 12 16 z M 36 16 A 2 2 0 0 0 36 20 A 2 2 0 0 0 36 16 z M 8.0449219 31.998047C8.2659219 33.653047 9.6334219 34.938047 11.357422 34.998047C22.232422 35.374047 30.282422 38.997359 34.607422 40.943359C35.377422 41.290359 36.039891 41.586547 36.587891 41.810547C36.890891 41.934547 37.208391 41.996094 37.525391 41.996094C38.009391 41.996094 38.488344 41.853172 38.902344 41.576172C39.589344 41.115172 40 40.343672 40 39.513672L40 32L37 32L37 36C35.864686 36 34.890507 36.633276 34.380859 37.560547C29.631178 35.463628 21.809525 32.357502 11.460938 32C11.458937 32 11.458031 31.998047 11.457031 31.998047L8.0449219 31.998047 z"/></svg>
        </div>
      </a>
    </div>
    
    </div>
  )
}

export default Summary
