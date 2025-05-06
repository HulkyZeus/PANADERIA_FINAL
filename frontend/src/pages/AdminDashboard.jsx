import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '24px 16px 0', background: '#fff', padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard; 