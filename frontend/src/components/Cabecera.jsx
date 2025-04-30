import 'antd/dist/reset.css';
import '../css/main.css';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import LogoSimple from '../img/LogoSimple.webp';
import styled from '@emotion/styled';
import { useTranslation } from "react-i18next";
import shoppingcart from '../img/shoppingcart.png';
import { useState } from 'react';  

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
  const [cartItems] = useState([]); 
  const items = [
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

  
  const CartModal = () => (
    // filepath: /Users/mariajosegarcia/Desktop/PANADERIA_FINAL/frontend/src/components/Cabecera.jsx
    <Modal
      title="Tu Carrito"
      open={isModalVisible} // Cambiado de "visible" a "open"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cerrar
        </Button>,
      ]}
      >
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '15px' }}>
              <img src={item.img} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
              <div>
                <h3>{item.title}</h3>
                <p>{`Cantidad: ${item.quantity}`}</p>
                <p>{`Precio: $${item.price}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );

  return (
    <Layout>
      <Header className="Cabeza" style={{ backgroundColor: '#f0ca83', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="Logo" style={{ marginRight: '20px' }}>
            <Imagen src={LogoSimple} />
          </Link>
          <Dropdown menu={languageMenu} trigger={['click']} style={{ marginRight: '20px', padding: '15px' }}>
            <Space style={{ fontSize: '20px', color: '#541e12' }}>
              {i18n.language === 'es' && 'ES'}
              {i18n.language === 'en' && 'EN'}
              {i18n.language === 'fr' && 'FR'}
              <DownOutlined style={{ fontSize: '15px' }} />
            </Space>
          </Dropdown>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Menu
            theme="#f0ca83"
            mode="horizontal"
            overflowedIndicator={null}
            selectable={false}
            style={{
              lineHeight: '70px',
              width: '100%',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}
            items={[
              {
                key: "1",
                label: (
                  <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space style={{ color: '#541e12' }}>
                        {t("Menú")}
                        <DownOutlined style={{ fontSize: '15px' }} />
                      </Space>
                    </a>
                  </Dropdown>
                ),
              },
              {
                key: "2",
                label: <Link to="/Nosotros" style={{ color: '#541e12' }}>{t("Nosotros")}</Link>,
              },
              {
                key: "3",
                label: <Link to="/Eventos" style={{ color: '#541e12' }}>{t("Eventos")}</Link>,
              },
              {
                key: "4",
                label: <Link to="/API" style={{ color: '#541e12' }}>{t("API")}</Link>,
              },
              {
                key: "6",
                label: (
                  <div style={{ marginLeft: '20px', verticalAlign: 'middle' }} onClick={showModal}>
                    <img src={shoppingcart} alt="Carrito" style={{ width: '23px', height: '23px' }} />
                  </div>
                ),
              },
              {
                key: "7",
                label: <Link to="/Login" style={{ color: '#541e12' }}><UserOutlined /></Link>,
              },
            ]}
          />
        </div>
      </Header>

      {/* Modal del carrito */}
      <CartModal />
    </Layout>
  );
};

export default Cabecera;



