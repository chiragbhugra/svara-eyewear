import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import useEyewearStore from '../stores/eyewearStore'; // Ensure this path is correct
import useSunglassesStore from '../stores/sunglassesStore';
import useUrbanEleganceStore from '../stores/urbaneleganceStore';


const Home = () => {
  const { fetchEyewear } = useEyewearStore(); // This should work if the store is defined correctly
  const { fetchSunglasses } = useSunglassesStore();
  const { fetchAccessories } = useUrbanEleganceStore();

  return (
    <div>
      <Header />
      <HeroSection />
      {/* <ProductCard /> */}
    </div>
  );
};

export default Home;