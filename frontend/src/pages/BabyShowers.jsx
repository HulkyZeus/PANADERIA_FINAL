import styled from '@emotion/styled';
import '../css/main.css/';
import { Carousel } from 'antd';
import { Layout, Row, Col } from 'antd';
import { Card } from 'antd';
import TortaVanillaBabyShower from '../img/TortaVanillaBabyShower.webp';
import TortaChocolateBaby from '../img/TortaChocolateBaby.webp';
import TortaRosada from '../img/TortaRosada.webp';
import TortaBabyNombre from '../img/TortaBabyNombre.webp';

import CupcakesRA from '../img/CupcakesRA.webp';
import GalletasBabyShower2 from '../img/GalletasBabyShower2.webp';
import CakePops from '../img/CakePops.webp';
import TartaletasCrema from '../img/TartaletasCrema.webp';

import CoctelAzul from '../img/CoctelAzul.webp';
import PinkLemonade from '../img/PinkLemonade.webp';
import SmoothiesFrutas from '../img/SmoothiesFrutas.webp';
import BatidoFresaPlatano from '../img/BatidoFresaPlatano.webp';

import MiniSandwiches from '../img/MiniSandwiches.webp';
import BocaditosQueso from '../img/BocaditosQueso.webp';
import BrochetasFrutas from '../img/BrochetasFrutas.webp';
import CanapesVariados from '../img/CanapesVariados.webp';
import { useTranslation } from "react-i18next";
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



const BabyShowers = () => {
    const {t} = useTranslation();

    const tortasDeBabyShower = [
      { title: [t('Torta Temática de Vainilla')], img: TortaVanillaBabyShower, description: [t('DTorta Temática de Vainilla')] },
      { title: [t('Torta de Chocolate')], img: TortaChocolateBaby, description: [t('DTorta de Chocolate')] },
      { title: [t('Torta Rosada')], img: TortaRosada, description: [t('DTorta Rosada')] },
      { title: [t('Torta Personalizada')], img: TortaBabyNombre, description: [t('DTorta Personalizada')] },
    ];
    
    const MesadePostres = [
      { title: [t('Cupcakes Decorados')], img: CupcakesRA, description: [t('DCupcakes Decorados')] },
      { title: [t('Galletas de Bebé')], img: GalletasBabyShower2, description: [t('DGalletas de Bebé')] },
      { title: [t('Cake Pops')], img: CakePops, description: [t('DCake Pops')] },
      { title: [t('Mini Tartaletas de Crema')], img: TartaletasCrema, description: [t('DMini Tartaletas de Crema')] },
    ];
    
    const Bebidas = [
      { title: [t('Coctel Azul Brillante')], img: CoctelAzul, description: [t('DCoctel Azul Brillante')] },
      { title: [t('Pink Lemonade')], img: PinkLemonade, description: [t('DPink Lemonade')] },
      { title: [t('Smoothies de Frutas')], img: SmoothiesFrutas, description: [t('DSmoothies de Frutas')] },
      { title: [t('Batido de Fresa y Plátano')], img: BatidoFresaPlatano, description: [t('Batido de Fresa y Plátano')] },
    ];
    
    const Bocadillos = [
      { title: [t('Mini Sándwiches')], img: MiniSandwiches, description: [t('DMini Sándwiches')] },
      { title: [t('Bocaditos de Queso y Uva')], img: BocaditosQueso, description: [t('DBocaditos de Queso y Uva')] },
      { title: [t('Brochetas de Frutas')], img: BrochetasFrutas, description: [t('DBrochetas de Frutas')] },
      { title: [t('Canapés Variados')], img: CanapesVariados, description: [t('DCanapés Variados')] },
    ];
    
  return(
  <>

    <Layout>
      <Content className='FondoPan'>
        <Carousel arrows autoplay infinite={false} >
          <div>
            <h3 style={contentStyle}>
              <div className='TortaBabyShower'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("TORTAS PARA")}</span>
                  <span className='TextoEvento'>{t("BABY SHOWER")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='CupcakesBabyShower'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("CUPCAKES PARA")}</span>
                  <span className='TextoEvento'>{t("BABY SHOWERS")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='MacaronTonosPastel'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("MACARONS EN")}</span>
                  <span className='TextoEvento'>{t("TONOS PASTEL")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='GalletasBabyShower'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("GALLETAS PARA")}</span>
                  <span className='TextoEvento'>{t("BABY SHOWERS")}</span>
                </div>
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='Tartaletas'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("MINI TARTALETAS")}</span>
                  <span className='TextoEvento'>{t("DE FRUTA")}</span>
                </div>
              </div>
            </h3>
          </div>        
        </Carousel>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H1>{t("Baby Showers")}</H1>
            <P1>
            {t("P1B1")}
            </P1>
            <P1>
            {t("P1B2")}
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
            <H2>{t("Tortas de Boda")}</H2>
            <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {tortasDeBabyShower.slice(0, 4).map((tortasDeBabyShower, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={tortasDeBabyShower.title} src={tortasDeBabyShower.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={tortasDeBabyShower.title} description={tortasDeBabyShower.description} style={{ width: '100%', height: '100px'}}/>
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
export default BabyShowers;