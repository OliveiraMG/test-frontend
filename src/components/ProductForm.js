import React, { useState } from 'react';
import styled from 'styled-components';
import { addOrUpdateProduct } from '../services/api';

const FormContainer = styled.div`
  margin-top: 80px;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
`;

const ProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: '',
    productGroup: '',
    salePrice: '',
    lastSaleDate: '',
    quantitySold: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrUpdateProduct(product);
      setProduct({ name: '', productGroup: '', salePrice: '', lastSaleDate: '', quantitySold: '' });
      if (onProductAdded) onProductAdded();
    } catch (error) {
      console.error('Erro ao adicionar/atualizar produto:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Adicionar/Atualizar Produto</h2>
      <h5>OBS: essa parte foi criada para testar a aplicação</h5>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nome do Produto"
          required
        />
        <Input
          name="productGroup"
          value={product.productGroup}
          onChange={handleChange}
          placeholder="Grupo"
          required
        />
        <Input
          name="salePrice"
          value={product.salePrice}
          onChange={handleChange}
          placeholder="Preço de Venda"
          type="number"
          step="0.01"
          required
        />
        <Input
          name="lastSaleDate"
          value={product.lastSaleDate}
          onChange={handleChange}
          placeholder="Data da Venda (AAAA-MM-DD)"
          type="date"
          required
        />
        <Input
          name="quantitySold"
          value={product.quantitySold}
          onChange={handleChange}
          placeholder="Quantidade Vendida"
          type="number"
          required
        />
        <Button type="submit">Salvar Produto</Button>
      </Form>
    </FormContainer>
  );
};

export default ProductForm;