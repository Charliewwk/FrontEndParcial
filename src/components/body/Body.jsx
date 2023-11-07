import React, { useState, useRef } from "react";
import "./body.css";
import CardOk from "../card/CardOk";
import CardError from "../card/CardError";
import { Card, Form, Button, FormGroup } from "react-bootstrap";
import QRCode from "react-qr-code";

const Body = () => {
  const [formData, setFormData] = useState({
    partNumber: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShow(false);
  };

  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(180);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);

    if (
      formData.partNumber.trim().length < 3 ||
      formData.partNumber.trim() !== formData.partNumber ||
      formData.description.length < 6
    ) {
      setError("Por favor chequea que la información sea correcta");
    } else {
      setError("");
    }
  };

  const printContent = useRef(null);

  const handlePrint = () => {
    const content = printContent.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Etiqueta QR</title>
        </head>
        <body onload="window.print(); window.close();">
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="margenSup container d-flex justify-content-center">
      <Card className="cardRepuestos shadow">
        <Card.Header>Generador de Etiquetas QR para Repuestos</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="partNumber" className="formGroup">
              <Form.Label>Número de parte</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de parte"
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
                className={show && error && "text-danger"}
              />
              <Form.Text className={show && error && "text-danger"}>
                Debe tener al menos 3 caracteres y no comenzar con espacio.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="description" className="formGroup">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={show && error && "text-danger"}
              />
              <Form.Text className={show && error && "text-danger"}>
                Debe tener al menos 6 caracteres.
              </Form.Text>
            </Form.Group>
            <FormGroup className="formBotones">
            <Button variant="primary" type="submit" className="float-right">
                Generar
            </Button>
            {show && !error && 
              <Button variant="primary" onClick={handlePrint} className="float-right">
                Imprimir
              </Button>
            }
            </FormGroup>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted formFooter">
          {show && (
            <>
              {error && <CardError error={error} />}
              {formData.partNumber && formData.description && !error && (
                <div className="footerOk">
                  <div className="leftContent">
                    <CardOk {...formData} />
                  </div>
                  <div className="rightContent">
                    <QRCode
                      title="Número de Parte"
                      value={formData.partNumber}
                      bgColor={back}
                      fgColor={fore}
                      size={size === "" ? 0 : size}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Body;
