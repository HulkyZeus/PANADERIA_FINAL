import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, message, Modal, Descriptions, Select } from 'antd';
import { getPedidosRequest, updatePedidoRequest, deletePedidoRequest } from '../../api/pedidos';
import { useAuth } from '../../context/AuthContext';
import { EyeOutlined, EditOutlined, CrownOutlined, DeleteOutlined } from '@ant-design/icons';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdminModalVisible, setIsAdminModalVisible] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      message.error('No tienes permisos para realizar esta acción');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      const response = await getPedidosRequest();
      console.log('Response from server:', response.data);

      // Transformar los datos para mostrar correctamente los productos
      const formattedOrders = response.data.map(order => {
        try {
          // Limpiar el string de productos de comillas adicionales
          let productosStr = order.productos;
          if (typeof productosStr === 'string') {
            // Eliminar comillas adicionales al inicio y final
            productosStr = productosStr.replace(/^"|"$/g, '');
            // Parsear el JSON
            const productos = JSON.parse(productosStr);
            console.log('Parsed productos:', productos);
            
            return {
              ...order,
              productos,
              key: order._id
            };
          }
          return order;
        } catch (error) {
          console.error('Error parsing order:', order, error);
          return {
            ...order,
            productos: [],
            key: order._id
          };
        }
      });

      console.log('Formatted orders:', formattedOrders);
      setOrders(formattedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Error al cargar los pedidos');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'confirmado': 'green',
      'completado': 'blue',
      'cancelado': 'red'
    };
    return colors[status] || 'default';
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleAdminActions = (order) => {
    setSelectedOrder(order);
    setIsAdminModalVisible(true);
  };

  const handleDeleteOrder = async (order) => {
    try {
      await deletePedidoRequest(order._id);
      message.success('Pedido eliminado correctamente');
      setIsAdminModalVisible(false);
      fetchOrders();
    } catch (error) {
      message.error('Error al eliminar el pedido');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedOrder = {
        ...selectedOrder,
        estado: newStatus,
        cliente_id: selectedOrder.cliente_id._id,
        metodo_pago: selectedOrder.metodo_pago,
        productos: selectedOrder.productos,
        total: selectedOrder.total
      };
      await updatePedidoRequest(selectedOrder._id, updatedOrder);
      message.success('Estado del pedido actualizado correctamente');
      setIsAdminModalVisible(false);
      fetchOrders();
    } catch (error) {
      message.error('Error al actualizar el estado del pedido');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (id) => id ? id.substring(0, 8) + '...' : 'N/A'
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente_id',
      key: 'cliente_id',
      render: (cliente) => cliente?.name || 'Cliente no especificado'
    },
    {
      title: 'Productos',
      dataIndex: 'productos',
      key: 'productos',
      render: (productos) => {
        if (!productos || !Array.isArray(productos)) return 'No hay productos';
        return (
          <ul style={{ padding: 0, margin: 0 }}>
            {productos.map((producto, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                {producto.name} x{producto.quantity}
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => total ? `$${total.toFixed(2)}` : '$0.00'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={getStatusColor(estado)}>
          {estado ? estado.toUpperCase() : 'CONFIRMADO'}
        </Tag>
      )
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha) => fecha ? new Date(fecha).toLocaleString() : 'Fecha no disponible'
    },
    {
      title: 'Dirección',
      dataIndex: 'cliente_id',
      key: 'address',
      render: (cliente) => cliente?.address || 'No especificada'
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewOrder(record)}
            style={{ backgroundColor: '#fff', color: '#612c1d', border: '1px solid #612c1d' }}
          >
            Ver
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleAdminActions(record)}
            style={{ backgroundColor: '#fff', color: '#1890ff', 	border: '1px solid #1890ff' }}
          >
            Cambiar
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#612c1d' }}>Gestión de Pedidos</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} pedidos`
        }}
        scroll={{ x: true }}
      />

      <Modal
        title="Detalles del Pedido"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{selectedOrder._id}</Descriptions.Item>
            <Descriptions.Item label="Cliente">{selectedOrder.cliente_id?.name || 'No especificado'}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedOrder.cliente_id?.email || 'No especificado'}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{selectedOrder.cliente_id?.celular || 'No especificado'}</Descriptions.Item>
            <Descriptions.Item label="Dirección">{selectedOrder.cliente_id?.address || 'No especificada'}</Descriptions.Item>
            <Descriptions.Item label="Cédula">{selectedOrder.cliente_id?.cedula || 'No especificada'}</Descriptions.Item>
            <Descriptions.Item label="Método de Pago">{selectedOrder.metodo_pago}</Descriptions.Item>
            <Descriptions.Item label="Estado">
              <Tag color={getStatusColor(selectedOrder.estado)}>
                {selectedOrder.estado?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Productos">
              <ul style={{ padding: 0, margin: 0 }}>
                {selectedOrder.productos.map((producto, index) => (
                  <li key={index} style={{ listStyle: 'none' }}>
                    {producto.name} x{producto.quantity} - ${producto.price * producto.quantity}
                  </li>
                ))}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Total">${selectedOrder.total?.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{new Date(selectedOrder.fecha).toLocaleString()}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Acciones Administrativas"
        open={isAdminModalVisible}
        onCancel={() => setIsAdminModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <div style={{ padding: '20px' }}>
            <h3>Pedido #{selectedOrder._id.substring(0, 8)}</h3>
            <p>Estado actual: <Tag color={getStatusColor(selectedOrder.estado)}>{selectedOrder.estado?.toUpperCase()}</Tag></p>
            
            <div style={{ marginBottom: '20px' }}>
              <h4>Cambiar Estado</h4>
              <Select
                style={{ width: '100%', marginBottom: '10px' }}
                defaultValue={selectedOrder.estado}
                onChange={handleStatusChange}
              >
                <Select.Option value="confirmado">Confirmado</Select.Option>
                <Select.Option value="completado">Completado</Select.Option>
                <Select.Option value="cancelado">Cancelado</Select.Option>
              </Select>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>Eliminar Pedido</h4>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteOrder(selectedOrder)}
                style={{ width: '100%' }}
              >
                Eliminar Pedido
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;