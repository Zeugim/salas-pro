import React from 'react';
import { Link, Inertia } from '@inertiajs/inertia-react';
import axios from 'axios';

const AdminPanel = ({ salas }) => {

    const handleLogout = () => {
        console.log('Se ha llamado a la función handleLogout');
        Inertia.post('/admin/logout');
    };

    const handleEditSala = (salaID) => {
        window.location.url = `http://localhost:8000/admin/salas/${salaID}/edit`
    };

    const handleDelSala = (salaID) => {

        axios.delete(`/admin/salas/${salaID}`)
            .then(response => {
                console.log(response.data);
                fetchSalas();
            })
            .catch(err => console.log(err));
    };

    const EditSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
        </svg>
    )

    const DelSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" />
        </svg>
    )

    return (
        <div className="container">
            <h1 className="mt-4">Panel de Administración</h1>
            <div className="d-flex justify-content-center my-5">
                <button onClick="" className="btn btn-primary" style={{ width: '30%', border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold', backgroundColor: '#2c3e50', color: '#f3f4f6' }}>
                    <div><Link href="/admin/salas/create" style={{ width: '30%', border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold', backgroundColor: '#2c3e50', color: '#f3f4f6', textDecoration: "none" }}>Crear Sala</Link></div>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sala</th>
                        <th>Provincia</th>
                        <th className="d-none d-lg-table-cell">Municipio</th>
                        <th className="d-none d-lg-table-cell">Géneros</th>
                        <th className="d-none d-lg-table-cell">Aforo</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {salas
                        .sort((a, b) => a.sala.localeCompare(b.sala))
                        .map((sala, index) => (
                            <tr key={index}>
                                <td style={{ cursor: 'pointer' }}>{sala.sala}</td>
                                <td>{sala.provincia}</td>
                                <td className="d-none d-lg-table-cell">{sala.municipio}</td>
                                <td className="d-none d-lg-table-cell">{sala.genero}</td>
                                <td className="d-none d-lg-table-cell">{sala.aforo}</td>
                                <td>
                                    <Link href={`/admin/salas/${sala.id}/edit`}>
                                        <button onClick={() => handleEditSala(sala.id)}><EditSvg /></button>
                                    </Link>
                                </td>
                                <td><button onClick={() => handleDelSala(sala.id)}><DelSvg /></button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-5">
                <button onClick={handleLogout} className="btn btn-primary" style={{ width: '30%', border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold', backgroundColor: '#2c3e50', color: '#f3f4f6' }}>Cerrar Sesión</button>
            </div>
        </div >

    );
};

export default AdminPanel;