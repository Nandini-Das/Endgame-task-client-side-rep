import React from 'react';
import Banner from '../Banner';
import SearchField from './Searchfield';
import CollegeImageGallery from './CollegeImageGallery';
import RecommendedResearchPapers from './RecommendedResearchPapers';
import CollegeReviews from './CollegeReviews';
import CollegeShow from './CollegeShow';

const Home = () => {
    return (
        <div>
            <SearchField></SearchField>
            <Banner></Banner>
            <CollegeShow></CollegeShow>
            <CollegeImageGallery></CollegeImageGallery>
            <RecommendedResearchPapers></RecommendedResearchPapers>
            <CollegeReviews></CollegeReviews>
        </div>
    );
};

export default Home;