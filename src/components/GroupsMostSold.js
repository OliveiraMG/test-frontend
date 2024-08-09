import React, { useState, useEffect } from 'react';
import { fetchGroupsMostSold } from '../services/api';
import styled from 'styled-components';

const GroupContainer = styled.div`
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const GroupItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const GroupIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const GroupsMostSold = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGroupsMostSold();
        setGroups(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <GroupContainer>
      <h2>Grupos mais vendidos</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        groups.map((group, index) => (
          <GroupItem key={index}>
            <GroupIcon>🏆</GroupIcon>
            {group.groupName}
          </GroupItem>
        ))
      )}
    </GroupContainer>
  );
};

export default GroupsMostSold;
