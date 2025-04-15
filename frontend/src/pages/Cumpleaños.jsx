import styled from '@emotion/styled';
import '../css/main.css/';
import { Carousel } from 'antd';
import { Layout, Row, Col } from 'antd';
import { Card } from 'antd';
import { useTranslation } from "react-i18next";

import RainCake from '../img/RainCake.webp';
import ChocoCake from '../img/ChocoCake.webp';
import FruitCake from '../img/FruitCake.webp';
import PersoCake from '../img/PersoCake.webp';

import PersoCupcake from '../img/PersoCupcake.webp';
import CookieDeco from '../img/CookieDeco.webp';
import CakePops from '../img/CakePops.webp';
import JellyColor from '../img/JellyColor.webp';

import Flavors from '../img/Flavors.webp';
import BlueLimonade from '../img/BlueLimonade.webp';
import ColdChocolate from '../img/ColdChocolate.webp';
import SodaSabor from '../img/SodaSabor.webp';

import MiniHambur from '../img/MiniHambur.webp';
import MiniHotdog from '../img/MiniHotdog.webp';
import PalomitasSabor from '../img/PalomitasSabor.webp';
import MiniPizzas from '../img/MiniPizzas.webp';

const { Content } = Layout;

const H1 = styled.h1`
  font-weight: bold;
  margin: 20px;
  font-size: 26px;
`

const H2 = styled.h1`
  font-weight: bold;
  margin: 10px;
  font-size: 26px;
`

const P1 = styled.p`
  margin: 20px;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
`


const ContenOfrec = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-radius: 25px;
  background-color: #905d01;
  margin: 20px 0px;
`

const HOfrec = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin: 20px;
`



const contentStyle = {
  margin: 0,
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Cumpleaños = () => {
  const { t } = useTranslation(); 

  const tortasDeCumpleaños = [
    { title: [t('Torta Arcoíris')], img: RainCake, description: [t('DTorta Arcoíris')] },
    { title: [t('Torta de Chocolate')], img: ChocoCake, description: [t('DDDTorta de Chocolate')] },
    { title: [t('Torta de Frutas Tropicales')], img: FruitCake, description: [t('DTorta de Frutas Tropicales')] },
    { title: [t('Torta Temática')], img: PersoCake, description: [t('DTorta Temática')] },
  ];
  
  const MesadePostres = [
    { title: [t('Cupcakes Personalizados')], img: PersoCupcake, description: [t('DCupcakes Personalizados')] },
    { title: [t('Galletas Decoradas')], img: CookieDeco, description: [t('DGalletas Decoradas')] },
    { title: [t('Cake Pops de Colores')], img: CakePops, description: [t('DCake Pops de Colores')] },
    { title: [t('Gelatinas Multicolor')], img: JellyColor, description: [t('DGelatinas Multicolor')] },
  ];
  
  const Bebidas = [
    { title: [t('Batidos de Sabores')], img: Flavors, description: [t('DBatidos de Sabores')] },
    { title: [t('Limonada Azul')], img: BlueLimonade, description: [t('DLimonada Azul')] },
    { title: [t('Chocolatada Fría')], img: ColdChocolate, description: [t('DChocolatada Fría')] },
    { title: [t('Sodas Artesanales')], img: SodaSabor, description: [t('DSodas Artesanales')] },
  ];
  
  const Bocadillos = [
    { title: [t('Mini Hamburguesas')], img: MiniHambur, description: [t('DMini Hamburguesas')] },
    { title: [t('Hot Dogs Miniatura')], img: MiniHotdog, description: [t('DHot Dogs Miniatura')] },
    { title: [t('Palomitas Saborizadas')], img: PalomitasSabor, description: [t('DPalomitas Saborizadas')] },
    { title: [t('Mini Pizzas')], img: MiniPizzas, description: [t('DMini Pizzas')] },
  ];
  
  return(
  <>

    <Layout>
      <Content className='FondoPan'>
      <Carousel arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>
            <div className='TortaCumpleaños'>
              <div className='CajaLeft'>
                <span className='TextoEvento'>{t("TORTAS")}</span>
                <span className='TextoEvento'>{t("DE CUMPLEAÑOS")}</span>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className='CupcakesColoridos'>
              <div className='CajaRight'>
                <span className='TextoEvento'>{t("CUPCAKES")}</span>
                <span className='TextoEvento'>{t("COLORIDOS")}</span>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className='SnacksDivertidos'>
              <div className='CajaLeft'>
                <span className='TextoEvento'>{t("SNACKS")}</span>
                <span className='TextoEvento'>{t("DIVERTIDOS")}</span>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className='GalletasFiesta'>
              <div className='CajaRight'>
                <span className='TextoEvento'>{t("GALLETAS")}</span>
                <span className='TextoEvento'>{t("TEMÁTICAS")}</span>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className='MesaCumpleaños'>
              <div className='CajaLeft'>
                <span className='TextoEvento'>{t("MESA DE")}</span>
                <span className='TextoEvento'>{t("CUMPLEAÑOS")}</span>
              </div>
            </div>
          </h3>
        </div>
      </Carousel>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H1>{t("Cumpleaños")}</H1>
            <P1>
              {t("P1C1")}
            </P1>
            <P1>
              {t("P1C2")}  
            </P1>
          </Col>

          <Col span={4}>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
          </Col>
          <Col span={16}>
            <ContenOfrec>
              <HOfrec>{t("¿Qué ofrecemos?")}</HOfrec>
            </ContenOfrec>
          </Col>
          <Col span={4}>
          </Col>
        </Row>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H2>{t("Tortas de Cumpleaños")}</H2>
            <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {tortasDeCumpleaños.slice(0, 4).map((tortasDeCumpleaños, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={tortasDeCumpleaños.title} src={tortasDeCumpleaños.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={tortasDeCumpleaños.title} description={tortasDeCumpleaños.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <H2>{t("Mesa de Postres")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {MesadePostres.slice(0, 4).map((MesadePostres, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={MesadePostres.title} src={MesadePostres.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={MesadePostres.title} description={MesadePostres.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>              
              <H2>{t("Bebidas")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {Bebidas.slice(0, 4).map((Bebidas, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={Bebidas.title} src={Bebidas.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={Bebidas.title} description={Bebidas.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <H2>{t("Bocadillos")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {Bocadillos.slice(0, 4).map((Bocadillos, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={Bocadillos.title} src={Bocadillos.img} style={{ width: '100%', height: '250px' }}/>}
                      >
                        <Card.Meta title={Bocadillos.title} description={Bocadillos.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>              
          </Col>

          <Col span={4}>
          </Col>
        </Row>

      </Content>
    </Layout>

  </>
  )
};
export default Cumpleaños;