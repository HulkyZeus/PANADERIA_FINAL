import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={220} className="admin-sidebar">
    <div className="logo" style={{ color: '#fff', padding: 16, fontWeight: 'bold', fontSize: 18 }}>
      Admin Panel
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['customers']}>
      <Menu.Item key="customers" icon={<UserOutlined />}>
        <Link to="/admin/customers">Usuarios</Link>
      </Menu.Item>
      <Menu.Item key="products" icon={<ShoppingOutlined />}>
        <Link to="/admin/products">Productos</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/admin/settings">Configuración</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;