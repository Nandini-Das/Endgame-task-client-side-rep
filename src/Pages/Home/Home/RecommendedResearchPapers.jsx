import React from 'react';

const RecommendedResearchPapers = () => {
  // For demo, use a static list of recommended research paper links
  const recommendedPapers = [
    {
      id: 1,
      title: 'Research Paper 1',
      link: 'https://example.com/research_paper_1',
    },
    {
      id: 2,
      title: 'Research Paper 2',
      link: 'https://example.com/research_paper_2',
    },
    {
      id: 3,
      title: 'Research Paper 3',
      link: 'https://example.com/research_paper_3',
    },
    // Add more recommended papers as needed
  ];

  return (
    <section className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Recommended Research Papers</h2>
      <ul className="list-disc list-inside">
        {recommendedPapers.map((paper) => (
          <li key={paper.id}>
            <a href={paper.link} className="text-blue-500 hover:underline">
              {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecommendedResearchPapers;
