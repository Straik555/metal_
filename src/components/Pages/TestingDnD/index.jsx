import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import tableBlock from './img/table_block.png';
import resentTrades from './img/recent_trades.png';
import orderBook from './img/order_book.png';
import graphic from './img/graphic.png';
import createOrder from './img/create_order.png';
import { lgLayout, mdLayout, smLayout, xsLayout, xxsLayout } from './layouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Index() {
  const layouts = {
    lg: lgLayout, // must be unique layout for each size
    md: mdLayout,
    sm: smLayout,
    xs: xsLayout,
    xxs: xxsLayout,
  };

  useEffect(() => {
    // console.log('window width: ', window.innerWidth);
    const width = window.innerWidth;
  }, [window.innerWidth]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts} // layouts for component
      breakpoints={{ lg: 1200, md: 990, sm: 760, xs: 480, xxs: 200 }} // breakpoints for different window sizes
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} // columns number depends from window size
      compactType="vertical" // compacting all blocks vertial
      // preventCollision // block is unable to replaace another one
      autoSize // for rows
    >
      <div style={{ border: '1px solid red' }} key="graphic">
        <img src={graphic} alt="" />
      </div>
      <div style={{ border: '1px solid red' }} key="orderBook">
        <img src={orderBook} alt="" />
      </div>
      <div style={{ border: '1px solid red' }} key="resentTrades">
        <img src={resentTrades} alt="" />
      </div>
      <div style={{ border: '1px solid red' }} key="tableBlock">
        <img src={tableBlock} alt="" />
      </div>
      <div style={{ border: '1px solid red' }} key="createOrder">
        <img src={createOrder} alt="" />
      </div>
    </ResponsiveGridLayout>
  );
}

export default Index;
