import React from 'react';

const RecommendedResearchPapers = () => {
  const researchPapers = [
    {
      title: "The Impact of Artificial Intelligence on Healthcare: A Systematic Review",
      authors: "John Smith, Emily Johnson",
      publication: "Journal of Medical Research",
      year: "2022",
    },
    {
      title: "Climate Change and Its Effects on Biodiversity: A Meta-analysis",
      authors: "Sarah Anderson, Michael Brown",
      publication: "Environmental Science Review",
      year: "2021",
    },
    {
      title: "Advancements in Quantum Computing: Challenges and Opportunities",
      authors: "David Lee, Jessica Chen",
      publication: "Quantum Computing Journal",
      year: "2023",
    },
    {
      title: "Machine Learning Algorithms for Predicting Stock Market Trends",
      authors: "Alex Johnson, Rachel Davis",
      publication: "Financial Analytics Quarterly",
      year: "2022",
    },
    {
      title: "A Comparative Study of Deep Learning Models for Natural Language Processing",
      authors: "Jennifer Miller, Robert Wilson",
      publication: "International Journal of AI Research",
      year: "2021",
    },
    {
      title: "Understanding Cybersecurity Threats in the Internet of Things (IoT)",
      authors: "Michael Williams, Laura Evans",
      publication: "Cybersecurity Review",
      year: "2023",
    },

  ];


  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Recommended Research Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchPapers.map((paper, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
            <p className="text-gray-600 mb-2">{paper.authors}</p>
            <p className="text-gray-600 mb-2">{paper.publication}, {paper.year}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Read Paper
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedResearchPapers;
