import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sider width={220} className="admin-sidebar" style={{ backgroundColor: '#f0ca83' }}>
      <div className="logo" style={{ color: '#fff', padding: 16, fontWeight: 'bold', fontSize: 18, display: 'flex', justifyContent: 'center'}}>
        Admin Panel
      </div>
      <Menu style={{ backgroundColor: '#f0ca83' }} mode="inline" defaultSelectedKeys={['customers']}>
        <Menu.Item key="customers" icon={<UserOutlined />}>
          <Link to="/admin/customers">Usuarios</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<ShoppingOutlined />}>
          <Link to="/admin/products">Productos</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/orders">Pedidos</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/admin/settings">Configuración</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;