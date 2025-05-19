import 'antd/dist/reset.css';
import '../css/main.css';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Modal, Button, Table, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import LogoSimple from '../img/LogoSimple.webp';
import styled from '@emotion/styled';
import { useTranslation } from "react-i18next";
import shoppingcart from '../img/shoppingcart.png';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Imagen = styled.img`
  display: block;
  margin: 0 auto;
  width: 72px;
  height: 72px;
  cursor: pointer;
`;

const { Header } = Layout;

const Cabecera = () => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, [isModalVisible]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      message.warning('Por favor inicie sesión para realizar su pedido');
      navigate('/login');
      return;
    }
    navigate('/RealizarPedido');
    setIsModalVisible(false);
  };

  const removeFromCart = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, __, index) => (
        <Button type="link" danger onClick={() => removeFromCart(index)}>
          Eliminar
        </Button>
      ),
    },
  ];

  const menuItems = [
    {
      label: <Link to="/Panaderia">{t("Panadería")}</Link>,
      key: "1",
    },
    {
      label: <Link to="/Pasteleria">{t("Pastelería")}</Link>,
      key: "2",
    },
    {
      label: <Link to="/Desayunos">{t("Desayunos")}</Link>,
      key: "3",
    },
    {
      label: <Link to="/Bebidas">{t("Bebidas")}</Link>,
      key: "4",
    },
    {
      label: <Link to="/Combos">{t("Combos")}</Link>,
      key: "5",
    },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item onClick={() => handleLanguageChange('es')}>ES</Menu.Item>
      <Menu.Item onClick={() => handleLanguageChange('en')}>EN</Menu.Item>
    </Menu>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "#f0ca83", padding: "0 50px", display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <Imagen src={LogoSimple} alt="Logo" />
          </Link>
          <Dropdown menu={languageMenu} trigger={['click']} style={{ marginLeft: '20px' }}>
            <Space style={{ fontSize: '20px', color: '#541e12', cursor: 'pointer' }}>
              {i18n.language.toUpperCase()}
              <DownOutlined style={{ fontSize: '15px' }} />
            </Space>
          </Dropdown>
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
          items={[
            {
              key: "menu",
              label: (
                <Dropdown menu={{ items: menuItems }}>
                  <Space style={{ color: '#541e12', cursor: 'pointer' }}>
                    {t("Menú")}
                    <DownOutlined style={{ fontSize: '15px' }} />
                  </Space>
                </Dropdown>
              ),
            },
            {
              key: "nosotros",
              label: <Link to="/Nosotros" style={{ color: '#541e12' }}>{t("Nosotros")}</Link>,
            },
            {
              key: "eventos",
              label: <Link to="/Eventos" style={{ color: '#541e12' }}>{t("Eventos")}</Link>,
            },
            {
              key: "ubicanos",
              label: <Link to="/API" style={{ color: '#541e12' }}>{t("Ubicanos")}</Link>,
            },
            {
              key: "carrito",
              label: (
                <div onClick={showModal} style={{ cursor: 'pointer' }}>
                  <img src={shoppingcart} alt="Carrito" style={{ width: '22px', height: '22px' }} />
                </div>
              ),
            },
            {
              key: "login",
              label: <Link to="/Login" style={{ color: '#541e12' }}><UserOutlined style={{ fontSize: '20px' }}/></Link>,
            },
          ]}
        />

        <Modal
          title="Carrito de Compras"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <div key="total" style={{ textAlign: 'right', marginBottom: '16px' }}>
              <strong>Total: ${calculateTotal().toFixed(2)}</strong>
            </div>,
            <Button key="cancel" onClick={handleCancel}>
              Cerrar
            </Button>,
            <Button
              key="checkout"
              type="primary"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              style={{ backgroundColor: '#bb8f51' }}
            >
              Proceder al Pago
            </Button>,
          ]}
          width={800}
        >
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey={(record, index) => index}
            pagination={false}
          />
        </Modal>
      </Header>
    </Layout>
  );
};

export default Cabecera;



