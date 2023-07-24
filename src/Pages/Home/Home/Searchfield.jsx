import React, { useEffect, useState } from 'react';

const SearchField = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    // Fetch data from the server using the provided URL
    fetch('https://endgame-task-server.vercel.app/colleges')
      .then((response) => response.json())
      .then((data) => {
        // Update the colleges state with the fetched data
        setColleges(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (!searchQuery) {
      // If the searchQuery is empty or not provided, show all colleges
      setShowResults(true);
      return;
    }

    // Implement your search logic here, filtering colleges based on searchQuery
    const filteredColleges = colleges.filter(
      (college) => college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setColleges(filteredColleges);
    setShowResults(true); // Set to true to display college cards
  };

  return (
    <div>
    {/* Navbar component (use the Navigation component from previous examples) */}
    <div className="p-4">
      {/* Search Field */}
      <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} // Ensure this is correctly bound
  placeholder="write college name..."
  className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
/>
      <button
        onClick={handleSearch}
        className="mt-2 ms-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </div>

    {/* College Cards Section */}
    {showResults && colleges.length > 0 ? (
      <div className="flex flex-wrap justify-around">
        {colleges.map((college) => (
          <div key={college.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img src={college.imageUrl} alt={college.name} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{college.name}</div>
              <p className="text-gray-700 text-base mb-2">{college.admissionDates}</p>
              <p className="text-gray-700 text-base mb-2">{college.events}</p>
              <p className="text-gray-700 text-base mb-2">{college.researchHistory}</p>
              <p className="text-gray-700 text-base mb-2">{college.sports}</p>
            </div>
            <div className="px-6 py-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={() => {
                  // Handle the click event to navigate to the college details route
                  // You can use React Router or any other routing library for this
                }}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : showResults && colleges.length === 0 ? (
      <p className="text-center text-gray-600 mt-4">No data found.</p>
    ) : null}
  </div>

  );
};

export default SearchField;
