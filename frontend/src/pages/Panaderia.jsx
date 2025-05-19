import "../css/main.css";
import { Layout, Row, Col, Modal, Button } from "antd";
import { useState } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import axios from "../api/axios";
import FondoPan from '../img/FondoPan.webp'
import { useEffect } from "react";
import axios from "../api/axios";
import FondoPan from '../img/FondoPan.webp'


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
  const [products, setProducts] = useState([]);
  const [isFlipped, setIsFlipped] = useState(Array(products.length).fill(false));
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCardClick = (index) => {
    setIsFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };


  useEffect(() => {
    // Traer productos de la categoría "Panadería"

    const fetchPanaderia = async () => {
      try {
        const response = await getProductsByCategory("panaderia");
        setProducts(response.data);
        setQuantities(Array(response.data.length).fill(0));
        setIsFlipped(Array(response.data.length).fill(false));
      } catch (error) {
        //Manejo de error
      }
    };
    fetchPanaderia();
  }, []);

  const handleQuantityChange = (index, change, event) => {
    event.stopPropagation();
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(newQuantities[index] + change, 0);// Evita valores negativos
    newQuantities[index] = Math.max(newQuantities[index] + change, 0);// Evita valores negativos
    newQuantities[index] = Math.max(newQuantities[index] + change, 0);// Evita valores negativos
    setQuantities(newQuantities);
  };

  const addToCartHandler = (index, event) => {
    event.stopPropagation();
    if (quantities[index] > 0) {
      const newItem = { ...products[index], quantity: quantities[index] };
      setCart((prevCart) => [...prevCart, newItem]);// Agrega el producto al carrito
      setQuantities([...quantities.slice(0, index), 0, ...quantities.slice(index + 1)]); // Reinicia la cantidad a 0
      setIsModalVisible(true); 
    }
      setCart((prevCart) => [...prevCart, newItem]);// Agrega el producto al carrito
      setQuantities([...quantities.slice(0, index), 0, ...quantities.slice(index + 1)]); // Reinicia la cantidad a 0
      setIsModalVisible(true); 
    }
  };


  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>{t("Cargando productos...")}</p>;
  }


  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/products");
      const filteredProducts = response.data.filter(product => product.category.toLowerCase === "panes");
      setProducts(filteredProducts);
      setQuantities(Array(response.data.length).fill(0));// Inicializa las cantidades en 0
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }finally {
      setIsLoading(false);
    }
  }


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
            <Row key={i} gutter={[16, 16]} justify="center" style={{ margin: "30px 200px" }}>
              {products.slice(i * 4, (i + 1) * 4).map((product, index) => (
                <Col key={product.id} span={6}>
                  <div
                    className={`custom-card ${isFlipped[i * 4 + index] ? "flipped" : ""}`}
                    onClick={() => handleCardClick(i * 4 + index)}
                    style={{ marginBottom: "20px" }}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <div className="card-header">
                          <div className="card-image-wrapper">
                            <img src={product.imageUrl} alt={product.name} className="card-image" />
                          </div>
                        </div>
                        <h3 style={{ padding: "15px", fontWeight: 900 }}>{product.name}</h3>
                      </div>
                      <div className="card-back">
                        <div className="background-image" style={{ backgroundImage: `url(${product.imageUrl})` }} />
                        <div className="card-content">
                          <h3 className="product-name">{product.name}</h3>
                          <p>{product.description}</p>
                          <p><strong>${isNaN(product.price) ? "0" : product.price}</strong></p>
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

export default Panaderia;