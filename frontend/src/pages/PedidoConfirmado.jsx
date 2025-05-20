import React from 'react';
import { Layout, Card, Typography, Space, Tag, Button} from 'antd';
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

          <Space direction="vertical" size="large" style={{ width: '100%'}}>
          <div>
            <Title level={4}>Detalles del Pedido</Title>

            {/* Línea por campo */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Cliente:</Text>
              <Text>{pedido.name}</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Dirección:</Text>
              <Text>{pedido.address}</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Cédula:</Text>
              <Text>{pedido.cedula}</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Celular:</Text>
              <Text>{pedido.celular}</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Método de Pago:</Text>
              <Text>{pedido.metodo_pago}</Text>
            </div>
          </div>

            <div style={{ flex: 2, textAlign: 'left' }}>
              <Title level={4}>Productos</Title>

              {/* Encabezados */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 'bold', 
                marginBottom: '8px' 
              }}>
                <div style={{ flex: 1.5, textAlign: 'left', color: 'grey'}}>Producto</div>
                <div style={{ flex: 1, textAlign: 'center', color: 'grey' }}>Cantidad</div>
                <div style={{ flex: 1.5, textAlign: 'right', color: 'grey' }}>Precio</div>
              </div>

              {/* Lista de productos */}
              {pedido.productos.map((producto, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}
                >
                  <div style={{ flex: 1.5, textAlign: 'left' }}>
                    <Text>{producto.name}</Text>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <Text>x{producto.quantity}</Text>
                  </div>
                  <div style={{ flex: 1.5, textAlign: 'right' }}>
                    <Text>${(producto.price * producto.quantity).toFixed(2)}</Text>
                  </div>
                </div>
              ))}

              {/* Total y estado */}
              <div style={{ marginTop: '16px', borderTop: '1px solid #ccc', paddingTop: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>Total</Title>
                  <Text strong style={{ fontSize: '16px' }}>${pedido.total.toFixed(2)}</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>Estado</Title>
                  <Tag color={pedido.estado === 'confirmado' ? 'green' : 'green'}>
                    {pedido.estado.toUpperCase()}
                  </Tag>
                </div>
              </div>
              {/* Botón para regresar */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Button type="default" onClick={() => window.location.href = '/'}>
                  Regresar al comercio
                </Button>
              </div>
            </div>
          </Space>
        </StyledCard>
      </Content>
    </Layout>
  );
};

export default PedidoConfirmado; 