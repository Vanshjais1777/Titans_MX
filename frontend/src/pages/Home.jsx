import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Header from '../components/Header';
import JobSection from "../components/JobSection";
import TalentsSection from "../components/TalentsSection";
import StepsSection from "../components/StepsSection";
import VideoSection from "../components/VideoSection";
import CustomerReviews from "../components/CustomerReviews";
import JobStockBanner from "../components/JobStockBanner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <Categories />
        <TalentsSection />
        <StepsSection />
        <VideoSection />
        <CustomerReviews />
        <JobStockBanner />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
