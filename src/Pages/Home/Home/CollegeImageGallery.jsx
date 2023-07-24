import React from 'react';

const CollegeImageGallery = () => {
  // For demo, use a static list of college graduate group pictures
  const collegeImages = [
    'https://plus.unsplash.com/premium_photo-1682974406944-099e0b2a7ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGNvbGxlZ2UlMjBncmFkdWF0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1627556704314-1f7aee38ec57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1496469888073-80de7e952517?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbGxlZ2UlMjBncmFkdWF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://plus.unsplash.com/premium_photo-1682974406904-15916a7501f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNvbGxlZ2UlMjBncmFkdWF0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  
    'https://images.unsplash.com/photo-1620458738323-4148c6093433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlZ2UlMjBncmFkdWF0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1599943821034-8cb5c7526922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbGxlZ2UlMjBncmFkdWF0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    
    
    // Add more college images as needed
  ];

  return (
    <section className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">College Graduate Image Gallery</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
        {collegeImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`College Graduate ${index + 1}`}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>
    </section>
  );
};

export default CollegeImageGallery;
