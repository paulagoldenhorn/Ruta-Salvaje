/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { PiKeyFill, PiLockKeyFill } from 'react-icons/pi';
import { RiUserSettingsLine, RiUserLine } from 'react-icons/ri';
import { UserContext } from '../../context/userContext';
import Swal from 'sweetalert2';
import './AdminListUsers.css';

export const AdminListUsers = () => {
    const userValues = useContext(UserContext);
    const token = userValues.jwtCode;
    const [users, setUsers] = useState([]);
    const [roleChanges, setRoleChanges] = useState(0);

    const togglePermission = (id1) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#918f8e',
            cancelButtonColor: '#E95823',
            confirmButtonText: 'Sí, alterar rol de usuario seleccionado',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url2 = `http://184.73.112.5:8080/user/role`;
                const request = { id: '' };
                request.id = id1;
                const settings2 = {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request)
                };

                fetch(url2, settings2)
                    .then((response) => response.json())
                    .then(() => {
                        setRoleChanges(roleChanges + 1);
                    });
            }
        });
    };

    useEffect(() => {
        fetch(`http://184.73.112.5:8080/user/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.content);
            });
    }, [roleChanges]);

    return (
        <div className="listProductsAdmin">
            <p>
                Administracion &gt; Usuarios &gt; <span className="spanAdminList">Permisos</span>
            </p>
            <h3>Gestion de Permisos de administrador</h3>
            {users?.map((user, index) => (
                <div className='AdminCardItem' key={index}>
                    {user.role === 'ADMIN' ? (
                        <RiUserSettingsLine className={`AdminCardItemImgUser ${user.role === 'ADMIN' ? 'adminUserIcon' : ''}`} />
                    ) : (
                        <RiUserLine className={`AdminCardItemImgUser ${user.role === 'ADMIN' ? 'adminUserIcon' : ''}`} />
                    )}
                    <div className='orderTitleCardArminUser'>
                        <h4><span className='spanAdminList2'>id:</span> #{user.id}</h4>
                        <h4><span className='spanAdminList2'>nombre y apellido:</span> {user.name} {user.lastname}</h4>
                        <h4><span className='spanAdminList2'>email:</span> {user.email}</h4>
                        <h4><span className='spanAdminList2'>tipo:</span> {user.role === 'ADMIN' ? 'administrador' : 'usuario'}</h4>
                    </div>
                    <div className='orderAdminButtonPro'>
                        <button className="Btn" onClick={() => togglePermission(user.id)}>
                            {user.role === 'ADMIN' ? 'quitar' : 'dar'}
                            {user.role === 'ADMIN' ? <PiLockKeyFill className="svg" /> : <PiKeyFill className="svg" />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
