import { useState } from 'react';
import styled from '@emotion/styled';
import '../css/main.css';
import { Layout, Flex, Row, Col } from 'antd';
import ImagenJuan from '../img/JuanPanaderia.jpg';
import Calidad from '../img/CalidadBlancoSVG.svg'
import Cercania from '../img/CercaniaBlancoSVG.svg'
import Innovacion from '../img/InnovacionBlancoSVG.svg'
import Responsabilidad from '../img/ResponsabilidadBlancoSVG.svg'
import { useTranslation } from "react-i18next";


const { Content } = Layout;

const Pan = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
`

const ContenedorImagen = styled.div`
  width: 28%;
  height: 100%;
`

const ImagenHistoria = styled.img`
  width: 120%;
  height: auto;
  border-radius: 10px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25); 
`

const ValorIcono = styled.div`
  background-color: #725D42;
  color: white;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5s ease-in-out;
`

const ValorTexto = styled.h2`
  margin: 8% 2%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const H1 = styled.h1`
  margin: 1%;
  font-size: 26px;
  font-weight: bold;
`

const H2 = styled.h2`
  margin: 2%;
  font-size: 24px;
  font-weight: bold;
`

const P = styled.p`
  margin: 20px;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
`

const P1 = styled.p`
  margin: 2%;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
`

const ImagenLogo = styled.img`
  width: 80px;  
`

const MisionVision = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 48%;
  height: 250px;
  border: solid black 2px;
  border-radius: 15px;
`
const TarjetaCircular = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: #C29F70;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  z-index: 10;
  
  p {
    margin: 0;
    font-size: 16px;
    color: white;
  }
`
const DIV = styled.div`
  border-bottom: 2px solid #000;
  width: 100%;
  background-color: #D5A254;
  border-radius: 13px 13px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DIV2 = styled.div`
  padding: 2%;
  display: flex;
  justify-content: center;
`

const Nosotros = () => {
  const {t} = useTranslation();
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const handleMouseEnter = (valor) => {
    setValorSeleccionado(valor);
    setMostrarTarjeta(true);
  };

  const handleMouseLeave = () => {
    setMostrarTarjeta(false);
  };
  return (
  <>
    <Layout style={{backgroundColor:'#e8e8e8'}}>
      <Content>
        <Pan>
          <div className='PanOrigen'></div>
        </Pan>
        <Row style={{ margin: '15px 0px'}}>
          <Col span={4}> 
          </Col>
          <Col span={16}>
            <Flex align='center' justify='center' vertical>
              <H1>{t("TituloN1")}</H1>
              <Flex align='center' justify='space-evenly'>
                <div style={{ width: '60%' }}>
                  <P>
                    {t("PN1")}
                  </P>
                  <P>
                    {t("PN2")}
                  </P>
                </div>
                <ContenedorImagen>
                  <Flex align='center' justify='center'>
                    <ImagenHistoria src={ImagenJuan} alt="Juan preparando pan" />
                  </Flex>
                </ContenedorImagen>
              </Flex>
            </Flex>
          </Col>
          <Col span={4}>
          </Col>
        </Row>

        <Row style={{ margin: '20px 0px', padding:'30px' }} className='GrayContent'>
          <Col span={4}>
          </Col>
          <Col span={16}>
            <Flex align='center' justify='center' vertical style={{ width: '100%' }}>

              <H1>{t("TituloN2")}</H1>
              <Flex align='center' justify='space-evenly' style={{ width: '100%', padding: '5px' }}>
                <ValorIcono onMouseEnter={() => handleMouseEnter('Calidad')} onMouseLeave={handleMouseLeave} className='AnimValor'>
                  <ImagenLogo src={Calidad} alt="Logo del valor de la calidad" />
                  <TarjetaCircular visible={mostrarTarjeta && valorSeleccionado === 'Calidad'}>
                    <p>{t("PCa")}</p>
                  </TarjetaCircular>  
                </ValorIcono>

                <ValorIcono onMouseEnter={() => handleMouseEnter('Cercanía')} onMouseLeave={handleMouseLeave} className='AnimValor'>
                  <ImagenLogo src={Cercania} alt="Logo del valor de la cercanía" />
                  <TarjetaCircular visible={mostrarTarjeta && valorSeleccionado === 'Cercanía'} >
                    <p>{t("PCe")}</p>
                  </TarjetaCircular>
                </ValorIcono>

                <ValorIcono onMouseEnter={() => handleMouseEnter('Innovación')} onMouseLeave={handleMouseLeave} className='AnimValor'>
                  <ImagenLogo src={Innovacion} alt="Logo del valor de la innovación" />
                  <TarjetaCircular visible={mostrarTarjeta && valorSeleccionado === 'Innovación'} >
                    <p>{t("PI")}</p>
                  </TarjetaCircular>
                </ValorIcono>

                <ValorIcono onMouseEnter={() => handleMouseEnter('Responsabilidad')} onMouseLeave={handleMouseLeave} className='AnimValor'>
                  <ImagenLogo src={Responsabilidad} alt="Logo del valor de la Responsabilidad" />
                  <TarjetaCircular visible={mostrarTarjeta && valorSeleccionado === 'Responsabilidad'}>
                    <p>{t("PR")}</p>
                  </TarjetaCircular>
                </ValorIcono>

              </Flex>
              <Flex align='center' justify='space-evenly' style={{ width: '100%' }}>
                <Col span={4}>
                  <ValorTexto>{t("Calidad")}</ValorTexto>
                </Col>
                <Col span={4}>
                  <ValorTexto>{t("Cercanía")}</ValorTexto>
                </Col>
                <Col span={4}>
                  <ValorTexto>{t("Innovación")}</ValorTexto>
                </Col>
                <Col span={4}>
                  <ValorTexto>{t("Responsabilidad")}</ValorTexto>
                </Col>
              </Flex>

            </Flex>
          </Col>
          <Col span={4}>
          </Col>
        </Row>

        <Row style={{ height: '250px', width: '100%', margin: '40px 0px' }}>
          <Col span={4}>
          </Col>
          <Col span={16}>

            <Flex align='center' justify='space-evenly'>
              
              <MisionVision>
                <DIV>
                  <H2 style={{color:'white'}}>{t("Misión")}</H2> 
                </DIV>
                <DIV2>
                  <P1>
                    {t("PNM")}
                  </P1>
                </DIV2>
                
              </MisionVision>
              <MisionVision>
                
                <DIV>
                <H2 style={{color:'white'}}>{t("Visión")}</H2>
                </DIV>
                <DIV2> 
                  <P1>
                    {t("PNV")}
                  </P1>
                </DIV2>
                
              </MisionVision>
            </Flex>

          </Col>
          <Col span={4}>
          </Col>
        </Row>
      </Content>
    </Layout>

  </>
  );
};

export default Nosotros;
