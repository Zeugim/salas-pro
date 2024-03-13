import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';

const CreateRoomForm = () => {
    const [formData, setFormData] = useState({
        sala: '',
        provincia: '',
        municipio: '',
        direccion: '',
        telefono: '',
        email: '',
        web: '',
        genero: '',
        aforo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/admin/rooms', formData);
    };

    return (
        <div className="container">
            <h4>Crear Nueva Sala</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sala">
                    <Form.Label>Sala</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la sala"
                        name="sala"
                        value={formData.sala}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="provincia">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="municipio">
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el municipio"
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="telefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese el email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="web">
                    <Form.Label>Sitio Web</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el sitio web"
                        name="web"
                        value={formData.web}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="genero">
                    <Form.Label>Género</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el género"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="aforo">
                    <Form.Label>Aforo</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese el aforo"
                        name="aforo"
                        value={formData.aforo}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear Sala
                </Button>
            </Form>
        </div>
    );
};

export default CreateRoomForm;