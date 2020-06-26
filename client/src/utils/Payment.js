import React from 'react';
import API from '../api/API';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';


export default function Payment({coast, ...rest}) {
    const [show, setShow] = React.useState(false);
    const [payed, setPayed] = React.useState(false);

    const [cardHolder, setCardHolder] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardCvv, setCardCvv] = React.useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        return cardHolder.length>0 && cardNumber.length===24 && cardCvv.length===3;
    }

    //verificare bene
    const handlePayment =() => {
        API.payment({cardHolder, cardNumber, cardCvv, rentProposal:{coast, ...rest}})
        .then((res) => {
            if(res==="DONE"){
                setPayed(true);
                setTimeout(()=>{
                    setShow(false);
                    setPayed(false);
                },2000)
            }
        });
        
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow} disabled={coast===0||coast===undefined}>
            Noleggia
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    {payed?(
                        <h1>PAGATO!</h1>
                    ):(<>
                            <Row>
                                <Col>
                                    <Form.Label>Intestatario Carta di Credito</Form.Label>
                                    <Form.Control 
                                        type="cardHolder" 
                                        placeholder="Intestatario Carta di Credito" 
                                        value={cardHolder}
                                        onChange={ e => setCardHolder(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Numero Carta di Credito</Form.Label>
                                    <Form.Control 
                                        type="cardNumber" 
                                        placeholder="Numero Carta di Credito" 
                                        value={cardNumber}
                                        onChange={ e => setCardNumber(e.target.value)}
                                        />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control 
                                        type="cardCvv" 
                                        placeholder="CVV" 
                                        value={cardCvv}
                                        onChange={ e => setCardCvv(e.target.value)}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <br></br>
                                    <h4>Costo: ‎ €{coast}</h4>
                                </Col>
                            </Row>
                        </>)}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {payed?(<></>):(
                    <>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" disabled={!validateForm()} onClick={()=>handlePayment()}>
                            Conferma e Paga
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
      </>
    );
  }