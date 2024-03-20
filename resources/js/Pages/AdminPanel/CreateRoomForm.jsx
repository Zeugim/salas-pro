import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

const CreateRoomForm = ({ sala }) => {
    const [formData, setFormData] = useState({
        sala: sala ? sala.sala : '',
        provincia: sala ? sala.provincia : '',
        provincia_code: sala ? sala.provincia_code : '',
        municipio: sala ? sala.municipio : '',
        municipio_code: sala ? sala.municipio_code : '',
        direccion: sala ? sala.direccion : '',
        telefono: sala ? sala.telefono : '',
        email: sala ? sala.email : '',
        web: sala ? sala.web : '',
        genero: sala ? sala.genero : '',
        aforo: sala ? sala.aforo : ''
    });

    const [provincias, setProvincias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('');
    const [municipioBloqueado, setMunicipioBloqueado] = useState(true);

    useEffect(() => {
        obtenerProvincias();
    }, []);

    const obtenerProvincias = async () => {
        try {
            const response = await axios.get('/provincias');
            setProvincias(response.data);
        } catch (error) {
            console.error('Error al obtener las provincias:', error);
        }
    };

    const obtenerMunicipios = async (provincia) => {
        try {
            const response = await axios.get(`/municipios/${provincia}`);
            setMunicipios(response.data);
        } catch (error) {
            console.error('Error al obtener los municipios:', error);
        }
    };

    const handleProvinciaSelection = (e) => {
        const provinciaSeleccionada = e.target.value;
        setProvinciaSeleccionada(provinciaSeleccionada);
        setMunicipioSeleccionado('');
        setMunicipioBloqueado(false);
        obtenerMunicipios(provinciaSeleccionada);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/admin/salas', formData);
    };

    return (
        <Container className="d-grid justify-content-center">
            <h1 className="d-flex mb-5 mt-4 justify-content-center">Crear Nueva Sala</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="sala">
                            <Form.Label>Sala:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la sala"
                                name="sala"
                                value={formData.sala}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="provincia">
                            <Form.Label>Provincia:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la provincia"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="provincia_code">
                            <Form.Label>Código de provincia:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el código"
                                name="provincia_code"
                                value={formData.provincia_code}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="municipio">
                            <Form.Label>Municipio:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el municipio"
                                name="municipio"
                                value={formData.municipio}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="municipio_code">
                            <Form.Label>Código de municipio:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el código"
                                name="municipio_code"
                                value={formData.municipio_code}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="direccion">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="telefono">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="web">
                            <Form.Label>Web:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el sitio web"
                                name="web"
                                value={formData.web}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="genero">
                            <Form.Label>Género:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el género"
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="aforo">
                            <Form.Label>Aforo:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el aforo"
                                name="aforo"
                                value={formData.aforo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-2">
                    <Button variant="primary" type="submit" className="btn btn-primary my-4" style={{ width: '30%', border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold', backgroundColor: '#2c3e50', color: '#f3f4f6' }}>
                        Crear Sala
                    </Button>
                </div>
            </Form>
        </Container >
    );
};

export default CreateRoomForm;