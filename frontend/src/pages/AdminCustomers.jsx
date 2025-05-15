import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Tag, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsersRequest, deleteUserRequest, updateUserRequest, updateUserRoleRequest } from '../api/users';

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsersRequest();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Error al cargar los usuarios');
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUserRequest(user._id);
      message.success('Usuario eliminado correctamente');
      fetchUsers();
    } catch (error) {
      message.error('Error al eliminar el usuario');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser.role !== values.role) {
        // Si el rol ha cambiado, usar updateUserRoleRequest
        await updateUserRoleRequest(editingUser._id, { role: values.role });
        console.log('Enviando rol:', values.role); // Para depuración
      } else {
        // Si solo se actualizan otros campos, usar updateUserRequest
        await updateUserRequest(editingUser._id, values);
      }
      message.success('Usuario actualizado correctamente');
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error);
      message.error(error.response?.data?.message || 'Error al actualizar el usuario');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'green' : 'blue'}>
          {role === 'admin' ? 'Administrador' : 'Usuario'}
        </Tag>
      ),
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}  
            onClick={() => handleEdit(record)}
            style={{ backgroundColor: '#fff', color: '#612c1d', border: '1px solid #612c1d' }}
          >
            Editar
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} usuarios`,
        }}
      />

      <Modal
        title="Editar Usuario"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Nombre de Usuario"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor ingrese el email' },
              { type: 'email', message: 'Por favor ingrese un email válido' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: 'Por favor seleccione el rol' }]}
          >
            <Select>
              <Select.Option value="usuario">Usuario</Select.Option>
              <Select.Option value="admin">Administrador</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCustomers;