import React from 'react';
import HomeSection from './HomeSection';
// import CoinSection from './CoinsSection';
import PageSection from './PageSection';
import CardSection from './CardSection';
import AdvantagesSection from './AdvantagesSection';
import StatisticSection from './StatisticSection';
import TradeCryptoSection from './TradeCryptoSection';

const HomePage = () => {
  return (
    <>
      <HomeSection />
      {/* <CoinSection /> */}
      <PageSection />
      <CardSection />
      <AdvantagesSection />
      <StatisticSection />
      <TradeCryptoSection />
    </>
  );
};

export default HomePage;
