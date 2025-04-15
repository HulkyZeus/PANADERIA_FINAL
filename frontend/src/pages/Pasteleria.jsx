import "../css/main.css";
import { useState } from "react"; // Importa useState correctamente
import { Layout, Row, Col, Modal, Button } from "antd";
import BrazoReina from "../img/brazodereina.png";
import Tresleches from "../img/tresleches.png";
import Ponque from "../img/ponque.png";
import TortaZana from "../img/tortazanahoria.png";
import TortaChoco from "../img/tortachoco.png";
import TortaAmapola from "../img/tortaamapola.png";
import TortaRed from "../img/tortared.png";
import Cupcakes from "../img/cupcakes.png";
import TortaFrutRojos from "../img/tortafrutrojos.png";
import HojaldrePollo from "../img/hojaldrepollo.png";
import Milhojas from "../img/milhojas.png";
import CheesecakeFrutos from "../img/cheesecakefrutos.png";
import TortaAlmojabana from "../img/tortaalmojabana.png";
import EmpanadaPollo from "../img/empanadapollo.png";
import EmpanadaCarne from "../img/empanadacarne.png";
import TortaMilky from "../img/tortamilky.png";
import FondoPas from "../img/FondoPas.webp";
import { useTranslation } from "react-i18next";

const cajaDecoracion = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "150px",
  backgroundColor: "rgba(114, 93, 66, 1)",
  borderRadius: "20px",
};

const texto = {
  fontSize: "50px",
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
};

const fondoPagina = {
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
};

const fondoImagen = {
  backgroundImage: `url(${FondoPas})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  opacity: 0.2,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const contenido = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
};

const { Content } = Layout;



const Pasteleria = () => {
  const { t } = useTranslation(); 

  const products = [
    { title: [t("Brazo de Reina")], img: BrazoReina, description: [t("DBrazo de Reina")], price: 10 },
    { title: [t("Torta de Tres Leches")], img: Tresleches, description: [t("DTorta de Tres Leches")], price: 10 },
    { title: [t("Ponqué Tradicional")], img: Ponque, description: [t("DPonqué Tradicional")], price: 10 },
    { title: [t("Torta de Red Velvet")], img: TortaRed, description: [t("DTorta de Red Velvet")], price: 10 },
    { title: [t("Torta de Zanahoria")], img: TortaZana, description: [t("DTorta de Zanahoria")], price: 10 },
    { title: [t("Torta de Chocolate")], img: TortaChoco, description: [t("DTorta de Chocolate")], price: 10 },
    { title: [t("Torta de Naranja con Amapola")], img: TortaAmapola, description: [t("DTorta de Naranja con Amapola")], price: 10 },
    { title: [t("Milhoja de Arequipe")], img: Milhojas, description: [t("DMilhoja de Arequipe")], price: 10 },
    { title: [t("Cheesecake de Frutos Rojos")], img: CheesecakeFrutos, description: [t("DCheesecake de Frutos Rojos")], price: 10 },
    { title: [t("Caja Cupcakes x4")], img: Cupcakes, description: [t("DCaja Cupcakes x4")], price: 10 },
    { title: [t("Torta Almojabana")], img: TortaAlmojabana, description: [t("DTorta Almojabana")], price: 10 },
    { title: [t("Torta Frutos Rojos")], img: TortaFrutRojos, description: [t("DTorta Frutos Rojos")], price: 10 },
    { title: [t("Torta Milky Way")], img: TortaMilky, description: [t("DTorta Milky Way")], price: 10 },
    { title: [t("Hojaldre de Pollo")], img: HojaldrePollo, description: [t("DHojaldre de Pollo")], price: 10 },
    { title: [t("Empanada Pollo")], img: EmpanadaPollo, description: [t("DEmpanada Pollo")], price: 10 },
    { title: [t("Empanada Carne")], img: EmpanadaCarne, description: [t("DEmpanada Carne")], price: 10 },
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
      const newItem = { ...products[index], quantity: quantities[index] };
      setCart((prevCart) => [...prevCart, newItem]);
      setQuantities([...quantities.slice(0, index), 0, ...quantities.slice(index + 1)]);
      setIsModalVisible(true); 
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={fondoPagina}>
        <div style={fondoImagen}></div>
        <div style={contenido}>
          <Row justify="center" align="middle" style={{ marginTop: "30px", height: "150px" }}>
            <Col span={16}>
              <div style={cajaDecoracion}>
                <span style={texto}>{t("PASTELERÍA")}</span>
              </div>
            </Col>
          </Row>
          {Array.from({ length: Math.ceil(products.length / 4) }, (_, i) => (
            <Row key={i} gutter={[16, 16]} justify="center" style={{ margin: "30px 200px" }}>
              {products.slice(i * 4, (i + 1) * 4).map((product, index) => (
                <Col key={index} span={6}>
                  <div
                    className={`custom-card ${isFlipped[i * 4 + index] ? "flipped" : ""}`}
                    onClick={() => handleCardClick(i * 4 + index)}
                    style={{ marginBottom: "20px" }}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <div className="card-header">
                          <div className="card-image-wrapper">
                            <img src={product.img} alt={product.title} className="card-image" />
                          </div>
                        </div>
                        <h3 style={{ padding: "15px", fontWeight: 900 }}>{product.title}</h3>
                      </div>
                      <div className="card-back">
                        <div
                          className="background-image"
                          style={{ backgroundImage: `url(${product.img})` }}
                        />
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
                            onClick={(e) => addToCartHandler(i * 4 + index, e)}
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
        {/* Modal para mostrar el carrito */}
      <Modal
        title="Tu Carrito"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            {t("Cerrar")}
          </Button>,
        ]}
        width={500}
        style={{ top: 20 }}
      >
        {cart.length === 0 ? (
          <p>{t("El carrito está vacío.")}</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="carrito-item" style={{ display: "flex", marginBottom: "15px" }}>
                <img src={item.img} alt={item.title} style={{ width: "50px", marginRight: "10px" }} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{`Precio: $${item.price}`}</p>
                  <p>{`Cantidad: ${item.quantity}`}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
      </Content>
    </Layout>
  );
};

export default Pasteleria;
