import { Layout, Row, Col } from "antd";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import "../css/main.css";

const { Content } = Layout;

const H1 = styled.h1`
  color: #fff;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`
const Button = styled.button`
  background-color: #bb8f51; /* Color principal */
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a0522d; /* Color más oscuro para hover */
  }
`
const TD = styled.td`
  font-weight: bold;
  font-size: 16px;
`


const Nosotros = () => {
  const { t } = useTranslation();

  return (
    <>
      <Layout style={{ backgroundColor: "#e8e8e8", paddingBottom: "30px" }}>  
        <Content>
          <div style={{margin:"90px"}}> </div>
          <Row className="realizarPedido-row" >
            {/* Primera columna */}
            <Col span={1} > </Col>
            <Col span={11} offset={1} className="realizarPedido-col-formulario">
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}>
              <div className="realizarPedido-titulo"> 
              <H1>{t("Detalles de Compra")}</H1>
              </div>
                <form className="realizarPedido-formulario">
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Nombre(s)")}</Label>
                    <input 
                      name="nombre" 
                      placeholder="Ingrese su Nombre Completo"
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Apellido(s)")}</Label>
                    <input 
                      name="apellido" 
                      placeholder="Ingrese su Apellido Completo"
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Cédula o NIT sin dígito de verificación")}</Label>
                    <input 
                      name="cedula"
                      type="number"
                      placeholder="Ingrese su Cédula o NIT" 
                      min="0"
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Email")}</Label>
                    <input 
                      name="email"
                      placeholder="Ingrese su Email"
                      type="email" 
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("No. Celular")}</Label>
                    <input 
                      name="celular"
                      type="number"
                      placeholder="Ingrese su Número de Celular"
                      min="0" 
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Dirección")}</Label>
                    <input 
                      name="direccion"
                      placeholder="Ingrese su Dirección"
                      className="realizarPedido-input"
                      />
                  </div>
                  <div className="realizarPedido-formulario-grupo">
                    <Label>{t("Datos adicionales de tu dirección")}</Label>
                    <input 
                      name="datosAdicionales"
                      placeholder="Ingrese datos adicionales de su dirección" 
                      className="realizarPedido-input"
                      />
                  </div>

                  <div className="realizarPedido-formulario-boton">
                  <Button type="submit">{t("Comprar")}</Button>
                  </div>
                  
                </form>
            </div>
            </Col>
            <Col span={1} > </Col>

            {/* Segunda columna */}
            <Col span={8} className="realizarPedido-col-resumen">
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}>
                <div className="realizarPedido-titulo"> 
                  <H1> {t("Resumen de tu Pedido")}</H1>
                </div>
                  <div className="realizarPedido-tabla-contenedor"> 
                    <table className="realizarPedido-tabla">
                      <thead>
                        <tr>
                          <TD> </TD> {/* Columna vacía para la imagen */}
                          <TD> {t("Producto")}</TD>
                          <TD> {t("Cantidad")}</TD>
                          <TD> {t("Subtotal")}</TD>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td>
                                <p> {t("Imagen")}</p>
                              </td>
                              <td>
                                <p> {t("Producto")}</p>
                              </td>
                              <td>
                                <p> {t("Cantidad")}</p>
                              </td>
                              <td>
                                <p> {t("Subtotal")}</p>
                              </td>
                            </tr>
                        <tr>
                          <td colSpan="4" className="realizarPedido-tabla-vacia">
                            No hay productos en el carrito
                          </td>
                        </tr>
                      
                    </tbody>
                  </table>

                  <div className="realizarPedido-carritoTotal">
                    <p className="totalLabel">Total A Pagar:</p>
                    <p className="total-precio">{ "COP"}</p>
                  </div>
                </div>
              </div>

            </Col>
            <Col span={1} > </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Nosotros;