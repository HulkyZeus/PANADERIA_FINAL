import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { getPedidosRequest, getPedidosByEmailRequest } from "../api/pedidos";
import styled from '@emotion/styled';
import { message, Layout, Row, Col, Card, Tag, Divider, Button, Table, Modal, Descriptions } from 'antd';
import { UserOutlined, MailOutlined, ShoppingOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Space } from 'antd';

const { Content } = Layout;

const DashboardContainer = styled(Content)`
  padding: 40px;
  background: linear-gradient(135deg, #fdf9ef 0%, #f5e6d3 100%);
  min-height: 100vh;
`;

const ProfileCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 24px;

  .ant-card-head-title {
    font-size: 24px;
    color: #725D42;
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background-color: #fdf9ef;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    border: 4px solid #725D42;
  }

  .profile-info {
    flex: 1;
  }

  .profile-name {
    font-size: 28px;
    color: #725D42;
    margin-bottom: 8px;
  }

  .profile-role {
    margin-bottom: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  .ant-input {
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    padding: 12px;
    font-size: 16px;
    
    &:focus {
      border-color: #725D42;
      box-shadow: 0 0 0 2px rgba(114, 93, 66, 0.2);
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  margin-right: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#725D42' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    margin-right: 8px;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const SuccessText = styled.p`
  color: #52c41a;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const UserDashboard = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { 
    profile, 
    loading, 
    error, 
    success,
    updateProfile,
    changePassword,
    loadProfile
  } = useUser();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Cargar perfil y pedidos al montar el componente
  useEffect(() => {
    loadProfile();
    cargarPedidos();
    if (user?.email) {
      fetchOrders();
    }
  }, [loadProfile, user]);

  const cargarPedidos = async () => {
    if (!profile?.email) return;
    
    setLoadingPedidos(true);
    try {
      const response = await getPedidosRequest();
      
      // Transformar y filtrar los pedidos del usuario
      const pedidosUsuario = response.data
        .filter(pedido => pedido.email?.toLowerCase() === profile.email.toLowerCase())
        .map(pedido => ({
          ...pedido,
          key: pedido._id,
          productos: typeof pedido.productos === 'string' 
            ? JSON.parse(pedido.productos.replace(/^"|"/g, '')) 
            : pedido.productos
        }));
      
      setPedidos(pedidosUsuario);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      message.error('Error al cargar los pedidos');
    } finally {
      setLoadingPedidos(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getPedidosByEmailRequest(user.email);
      const formattedOrders = response.data.data.map(order => ({
        ...order,
        key: order._id
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Error al cargar los pedidos');
    }
  };

  // Resetear formulario cuando cambia el modo de edición
  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username,
        email: profile.email
      });
    }
  }, [profile, isEditing, reset]);

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data);
      message.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error("🔴 Error completo:", error.response?.data); // 👈 Más detalles del error
      message.error(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword // Asegúrate de enviar este campo
      });
      message.success('Contraseña cambiada correctamente');
      setIsChangingPassword(false);
      reset({}, { keepValues: false });
    } catch (error) {
      console.error("Error detallado:", error.response?.data); // Para depuración
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else {
        message.error(error.response?.data?.message || 'Error al cambiar la contraseña');
      }
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

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (id) => id ? id.substring(0, 8) + '...' : 'N/A'
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
      render: (estado) => {
        let color = 'default';
        let icon = <CheckCircleOutlined />;
        
        switch (estado?.toLowerCase()) {
          case 'completado':
            color = '"processing"';
            icon = <CheckCircleOutlined />;
            break;
          case 'confirmado':
            color = 'success';
            icon = <CheckCircleOutlined />;
            break;
          case 'cancelado':
            color = 'error';
            icon = <CloseCircleOutlined />;
            break;
          default:
            break;
        }
        
        return <Tag icon={icon} color={color}>{estado ? estado.toUpperCase() : 'PENDIENTE'}</Tag>;
      }
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha) => fecha ? new Date(fecha).toLocaleString() : 'Fecha no disponible'
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
        </Space>
      )
    }
  ];

  if (loading && !profile) {
    return <DashboardContainer>Cargando perfil...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={24} md={20} lg={16} xl={14}>
          <ProfileCard
            title="Mi Perfil"
          >
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}

            <div className="profile-header">
              <div className="profile-avatar">
                <UserOutlined style={{ fontSize: 48, color: '#725D42' }} />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{profile?.username}</h1>
                <div className="profile-role">
                  <Tag color="#725D42">{profile?.role}</Tag>
                  <Tag icon={<CalendarOutlined />} color="#bb8f51">
                    Miembro desde {new Date(profile?.createdAt).toLocaleDateString()}
                  </Tag>
                </div>
              </div>
            </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <FormGroup>
              <Label>Nombre de usuario</Label>
              <Input
                {...register("username", { 
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres'
                  }
                })}
                disabled={loading}
              />
              {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Correo electrónico</Label>
              <Input
                type="email"
                {...register("email", { 
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                disabled={loading}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </FormGroup>

            <div>
              <Button type="submit" primary disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : isChangingPassword ? (
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <FormGroup>
              <Label>Contraseña actual</Label>
              <Input
                type="password"
                {...register("currentPassword", { 
                  required: 'Este campo es requerido'
                })}
                disabled={loading}
              />
              {errors.currentPassword && <ErrorText>{errors.currentPassword.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Nueva contraseña</Label>
              <Input
                type="password"
                {...register("newPassword", { 
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres'
                  }
                })}
                disabled={loading}
              />
              {errors.newPassword && <ErrorText>{errors.newPassword.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Confirmar nueva contraseña</Label>
              <Input
                type="password"
                {...register("confirmPassword", { 
                  required: 'Este campo es requerido',
                  validate: value => 
                    value === watch('newPassword') || 'Las contraseñas no coinciden'
                })}
                disabled={loading}
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
            </FormGroup>

            <div>
              <Button type="submit" primary disabled={loading}>
                {loading ? 'Guardando...' : 'Cambiar contraseña'}
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsChangingPassword(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <>
            <FormGroup>
              <Label>Nombre de usuario</Label>
              <p>{profile?.username}</p>
            </FormGroup>

            <FormGroup>
              <Label>Correo electrónico</Label>
              <p>{profile?.email}</p>
            </FormGroup>

            <FormGroup>
              <Label>Rol</Label>
              <p>{profile?.role}</p>
            </FormGroup>

            <FormGroup>
              <Label>Miembro desde</Label>
              <p>{new Date(profile?.createdAt).toLocaleDateString()}</p>
            </FormGroup>

            <div style={{ marginTop: '20px' }}>
              <Button onClick={() => setIsEditing(true)}>Editar perfil</Button>
              <Button onClick={() => setIsChangingPassword(true)}>
                Cambiar contraseña
              </Button>
              <Button onClick={logout}>Cerrar sesión</Button>
            </div>
          </>
        )}
          </ProfileCard>

          <ProfileCard title="Mis Pedidos">
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
          </ProfileCard>
        </Col>
      </Row>

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
    </DashboardContainer>
  );
};

export default UserDashboard;