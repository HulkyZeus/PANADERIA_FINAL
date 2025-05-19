import "../css/main.css";
import { Layout, Row, Col, Modal, Button, message } from "antd";
import { useState } from "react";
import Croissant from '../img/croissant.png';
import PanQue from '../img/pandequeso.png';
import Brownie from '../img/brownie.png';
import PanBrioche from '../img/panbrioche.png';
import PanGalleta from '../img/pangalleta.png';
import Cucas from '../img/cucas.png';
import Cañas from '../img/cañas.png';
import Panzerotti from '../img/panzerotti.png';
import PanMasaMadre from '../img/panmasamadre.png';
import PanHawaiano from '../img/panhawaiano.png';
import Pandebono from '../img/pandebono.png';
import Almojabanas from '../img/almojabanas.png';
import Mogollas from '../img/mogolla.png';
import PanAliñado from '../img/panaliñado.png';
import MojiconQueso from '../img/mojiconconqueso.png';
import PanBatido from '../img/panbatido.png';
import FondoPan from '../img/FondoPan.webp'
import { useTranslation } from "react-i18next";

const cajaDecoracion = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '150px',
  backgroundColor: 'rgba(114, 93, 66, 1)',
  borderRadius: '20px',
};

const texto = {
  fontSize: '50px',
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
};

const fondoPagina = {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
};

const fondoImagen = {
  backgroundImage: `url(${FondoPan})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 0.2,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
};

const contenido = {
  position: 'relative',
  zIndex: 2,
  padding: '20px',
};

const { Content } = Layout;

const Panaderia = () => {
  const { t } = useTranslation();

  const products = [
    { title: [t("Croissant")], img: Croissant, description: [t("DCroissant")], price: 10 },
    { title: [t("Pan Brioche Dulce")], img: PanBrioche, description: [t("DPan Brioche Dulce")], price: 10 },
    { title: [t("Pan de Queso")], img: PanQue, description: [t("DPan de Queso")], price: 10 },
    { title: [t("Pan Galleta")], img: PanGalleta, description: [t("DPan Galleta")], price: 10 },
    { title: [t("Cucas")], img: Cucas, description: [t("DCucas")], price: 10 },
    { title: [t("Caña")], img: Cañas, description: [t("DCaña")], price: 10 },
    { title: [t("Panzerotti")], img: Panzerotti, description: [t("DPanzerotti")], price: 10 },
    { title: [t("Pan de Masa Madre")], img: PanMasaMadre, description: [t("DPan de Masa Madre")], price: 10 },
    { title: [t("Pan Hawaiano")], img: PanHawaiano, description: [t("DPan Hawaiano")], price: 10 },
    { title: [t("Pandebono")], img: Pandebono, description: [t("DPandebono")], price: 10 },
    { title: [t("Almojabana")], img: Almojabanas, description: [t("DAlmojabana")], price: 10 },
    { title: [t("Mogolla")], img: Mogollas, description: [t("DMogolla")], price: 10 },
    { title: [t("Pan aliñado")], img: PanAliñado, description: [t("DPan aliñado")], price: 10 },
    { title: [t("Mojicón con Queso")], img: MojiconQueso, description: [t("DMojicón con Queso")], price: 10 },
    { title: [t("Brownie")], img: Brownie, description: [t("DBrownie")], price: 10 },
    { title: [t("Pan Batido")], img: PanBatido, description: [t("D  Pan Batido")], price: 10 },
  ];
  
  const [isFlipped, setIsFlipped] = useState(Array(products.length).fill(false));
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const handleCardClick = (index) => {
    setIsFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleQuantityChange = (index, change, event) => {
    event.stopPropagation();
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(newQuantities[index] + change, 0);
    setQuantities(newQuantities);
  };

  const addToCartHandler = (index, event) => {
    event.stopPropagation();
    if (quantities[index] > 0) {
      const newItem = { 
        name: products[index].title[0],
        price: products[index].price,
        quantity: quantities[index],
        image: products[index].img
      };
      
      // Obtener el carrito actual del localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Agregar el nuevo item
      currentCart.push(newItem);
      // Guardar el carrito actualizado
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      // Resetear la cantidad
      setQuantities([...quantities.slice(0, index), 0, ...quantities.slice(index + 1)]);
      
      // Mostrar mensaje de éxito
      message.success('Producto agregado al carrito');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={fondoPagina}>
        <div style={fondoImagen}></div>
        <div style={contenido}>
          <Row justify="center" align="middle" style={{ marginTop: "30px", height: "150px" }}>
            <Col span={16}>
              <div style={cajaDecoracion}>
                <span style={texto}>{t("PANADERÍA")}</span>
              </div>
            </Col>
          </Row>
          {Array.from({ length: Math.ceil(products.length / 4) }, (_, i) => (
            <Row key={i} gutter={[16, 16]} justify-content="center" style={{ margin:'30px 200px ' }}>
              {products.slice(i * 4, (i + 1) * 4).map((product, index) => (
                <Col key={index} span={6}>
                  <div
                    className={`custom-card ${isFlipped[i * 4 + index] ? "flipped" : ""}`}
                    onClick={() => handleCardClick(i * 4 + index)}
                    style={{ marginBottom: '20px' }}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <div className="card-header">
                          <div className="card-image-wrapper">
                            <img src={product.img} alt={product.title} className="card-image" />
                          </div>
                        </div>
                        <h3 style={{ padding: '15px', fontWeight: 900 }}>{product.title}</h3>
                      </div>
                      <div className="card-back">
                        <div className="background-image" style={{ backgroundImage: `url(${product.img})` }} />
                        <div className="card-content">
                          <h3 className="product-name">{product.title}</h3>
                          <p>{product.description}</p>
                          <p><strong>${product.price}</strong></p>
                          <div className="quantity-controls">
                            <div className="arrow-buttons">
                              <button
                                className="quantity-button up"
                                onClick={(e) => handleQuantityChange(i * 4 + index, 1, e)}
                              >
                                ▲
                              </button>
                              <button
                                className="quantity-button down"
                                onClick={(e) => handleQuantityChange(i * 4 + index, -1, e)}
                              >
                                ▼
                              </button>
                            </div>
                            <span className="quantity">{quantities[i * 4 + index]}</span>
                          </div>
                          <button
                            className="add-to-cart"
                            onClick={(e) => { e.stopPropagation(); addToCartHandler(i * 4 + index, e); }}
                          >
                            {t("Agregar")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Panaderia;