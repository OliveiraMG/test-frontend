import React, { useState } from 'react';
import styled from 'styled-components';
import CMVChart from './CMVChart';
import GroupsMostSold from './GroupsMostSold';
import ProductsLeastSold from './ProductsLeastSold';
import ProductForm from './ProductForm';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const LeftColumn = styled.div`
  width: 65%;
`;

const RightColumn = styled.div`
  width: 30%;
`;

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <DashboardContainer>
      <LeftColumn>
        <CMVChart key={`cmv-${refreshKey}`} />
        <ProductForm onProductAdded={handleProductAdded} />
      </LeftColumn>
      <RightColumn>
        <GroupsMostSold key={`groups-${refreshKey}`} />
        <ProductsLeastSold key={`products-${refreshKey}`} />
      </RightColumn>
    </DashboardContainer>
  );
};

export default Dashboard;