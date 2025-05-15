import React from "react";
import { Layout, Row, Col } from "antd";


const { Content } = Layout;

const Resenas = () => {
    return (
        <Layout style={{backgroundColor:'#e8e8e8'}}>
            <Content>
                <Row style={{ margin: '15px 0px'}}>
                    <Col span={4}>
                    </Col>
                    <Col span={16}>
                    <h1> Reseñas</h1>
                    </Col>
                </Row>

            </Content>
        </Layout>
    );
  };
  
  export default Resenas; 