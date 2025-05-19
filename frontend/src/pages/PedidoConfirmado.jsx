import React from 'react';
import { Layout, Card, Typography, Space, Tag } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled(CheckCircleFilled)`
  font-size: 48px;
  color: #52c41a;
  margin-bottom: 20px;
`;

const PedidoConfirmado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state?.pedido;

  if (!pedido) {
    navigate('/');
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px 20px' }}>
        <StyledCard>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <SuccessIcon />
            <Title level={2}>¡Pago Aceptado!</Title>
            <Text type="secondary">Tu pedido ha sido procesado correctamente</Text>
          </div>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>Detalles del Pedido</Title>
              <Text>Cliente: {pedido.name}</Text><br />
              <Text>Dirección: {pedido.address}</Text><br />
              <Text>Cédula: {pedido.cedula}</Text><br />
              <Text>Celular: {pedido.celular}</Text><br />
              <Text>Método de Pago: {pedido.metodo_pago}</Text>
            </div>

            <div>
              <Title level={4}>Productos</Title>
              {pedido.productos.map((producto, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <Text>{producto.name} x{producto.quantity} - ${(producto.price * producto.quantity).toFixed(2)}</Text>
                </div>
              ))}
            </div>

            <div>
              <Title level={4}>Total</Title>
              <Text strong>${pedido.total.toFixed(2)}</Text>
            </div>

            <div>
              <Title level={4}>Estado</Title>
              <Tag color="green">{pedido.estado.toUpperCase()}</Tag>
            </div>
          </Space>
        </StyledCard>
      </Content>
    </Layout>
  );
};

export default PedidoConfirmado; 