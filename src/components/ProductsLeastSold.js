import React, { useState, useEffect } from 'react';
import { fetchProductsLeastSold } from '../services/api';
import styled from 'styled-components';

const TableContainer = styled.div`
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const ProductsLeastSold = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductsLeastSold();
        setProducts(response.data.slice(0, 4));
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
    <TableContainer>
      <h2>Produtos menos vendidos</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <Td>{product.name}</Td>
                <Td>{product.quantitySold}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ProductsLeastSold;
