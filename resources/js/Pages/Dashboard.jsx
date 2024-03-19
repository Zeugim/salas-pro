import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from "react";

export default function Dashboard({ user, salas }) {

    const DelSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" />
        </svg>
    )

    const [favoritos, setFavoritos] = useState({});

    useEffect(() => {
        const favoritosIniciales = {};
        salas.forEach(sala => {
            favoritosIniciales[sala.id] = true;
        });
        setFavoritos(favoritosIniciales);
    }, [salas]);

    const handleFavoritoChange = (salaId) => {
        const esFavoritoActual = favoritos[salaId];
        const esFavoritoNuevo = !esFavoritoActual;
        const nuevosFavoritos = { ...favoritos, [salaId]: esFavoritoNuevo };
        setFavoritos(nuevosFavoritos);

        const id = user.id;
        const ruta = esFavoritoNuevo ? `/addfavoritos/${id}/${salaId}` : `/delfavoritos/${id}/${salaId}`;

        fetch(ruta, {
            method: "GET",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                if (!esFavoritoNuevo) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSalaClick = (id) => {
        window.open(`/salas/${id}`, '_blank');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="dash0">¡Hola {user.name}!</h2>}
            user={user}
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="col-12 col-md-8 col-lg-10 px-2 mx-auto">
                    <div className="dash3">
                        <h1 className="my-4">Salas guardadas:</h1>
                        <table className="col-12 col-md-8 col-lg-10">
                            <thead>
                                <tr>
                                    <th>Sala</th>
                                    <th>Provincia</th>
                                    <th className="d-none d-lg-table-cell">Municipio</th>
                                    <th className="d-none d-lg-table-cell">Géneros</th>
                                    <th className="d-none d-lg-table-cell">Aforo</th>
                                    {user && (<th>Favorito</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {salas
                                    .sort((a, b) => a.sala.localeCompare(b.sala))
                                    .map((sala, index) => (
                                        <tr key={index}>
                                            <td onClick={() => handleSalaClick(sala.id)} style={{ cursor: 'pointer' }} className="hover-effect">{sala.sala}</td>
                                            <td>{sala.provincia}</td>
                                            <td className="d-none d-lg-table-cell">{sala.municipio}</td>
                                            <td className="d-none d-lg-table-cell">{sala.genero}</td>
                                            <td className="d-none d-lg-table-cell">{sala.aforo}</td>
                                            <td>
                                                <button onClick={() => handleFavoritoChange(sala.id)}>
                                                    {favoritos[sala.id]} <DelSvg />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}