import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { BsGear } from "react-icons/bs";
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import Styles from './UserEditInfo.module.css';

export const UserEditInfo = () => {
  const userValues = useContext(UserContext);
  const token = userValues.jwtCode;
  const userData = userValues.user;

  const [id, setId] = useState(userData.id);
  const [name, setName] = useState(userData.name);
  const [lastname, setLastname] = useState(userData.lastname);
  const [email, setEmail] = useState(userData.email);
  const [role, setRole] = useState(userData.role);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '/images/useravatar.png');

  useEffect(() => {
    if (userData) {
      setId(userData.id);
      setName(userData.name);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setRole(userData.role);
    }
  }, [userData]);

  const saveChanges = async () => {
    const updateUserObjet = {
      id: userData.id,
      name: name,
      lastname: lastname,
      email: email
    }
    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateUserObjet)
    }
    console.log(updateUserObjet)
    await toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        loading: 'Cambiando datos...',
        success: <b>cambios guardados!</b>,
        error: <b>no se pudo guardar.</b>,
        style: {
          backgroundColor: '#e95823',
          color: '#ffffff',
        },
      }
    );
    fetch(`http://184.73.112.5:8080/user/limited`, settings)
      .then(response => {
        if (response.status === 200) {
          const newToken = response.headers.get('Authorization');
          if (newToken) {
            localStorage.setItem('token', newToken);
          }
          toast.success('Perfil actualizado con éxito', {
            duration: 3000,
          })
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          console.error(response.status)
          toast.error('Error al actualizar el perfil');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error de conexion');
      });
  };


  const saveChangesPassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('Completa todos los campos de contraseña');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Las contraseñas nuevas no coinciden');
      return;
    }

    const updateUserObjet = {
      id: userData.id,
      name: name,
      lastname: lastname,
      email: email,
      password: newPassword,
      role: userData.role
    };

    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateUserObjet)
    };

    try {
      const response = await fetch(`http://184.73.112.5:8080/user`, settings);

      if (response.status === 200) {
        toast.success('Contraseña actualizada con éxito', {
          duration: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error(response.status);
        toast.error('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión');
    }
  };

  const deleteUser = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. ¿Deseas eliminar tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e95823',
      cancelButtonColor: '#525050',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://184.73.112.5:8080/user/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            window.location.href = '/login';
          } else {
            setError('Error al eliminar el usuario.');
          }
        } catch (error) {
          setError('Error de red al intentar eliminar el usuario.');
        }
      }
    });
  };

  return (
    <div>
      <div className={Styles.boxXitemsContainer}>
        <h3>Editar perfil</h3>
        <BsGear className={Styles.iconSave} />
      </div>
      <div className={Styles.userNameInfo}>
        <div className={Styles.userImgDetailsBox}>
          <img src={profileImage || '/images/useravatar.png'} alt="" />
        </div>
        <div className={Styles.userInfoDet}>
          <p>Nombre: <span>{name}</span> </p>
          <p>Apellido: <span>{lastname}</span> </p>
          <p>Email: <span>{email}</span> </p>
          <p>Rol: <span>{role === "ADMIN" ? "Administrador" : "Usuario"}</span> </p>
        </div>
      </div>
      <div className={Styles.editData}>
        <div className={Styles.editProfileS}>
          <h3>Editar Informacion</h3>
          <div className={Styles.editOrderLis}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={Styles.btnEdit} onClick={saveChanges}>Editar Perfil</button>
            <p className={Styles.btnnotPasnu}>.</p>
          </div>
        </div>
        <div className={Styles.editProfileS}>
          <h3>Cambiar Contraseña</h3>
          <div className={Styles.editOrderLis}>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button className={Styles.btnEdit} onClick={saveChangesPassword}>Cambiar Contraseña</button>
            <p className={Styles.btnnotPas}>Olvidaste tu contraseña?</p>
          </div>
        </div>
      </div>
      <div className={Styles.errorcen}>
        {error && <p className={Styles.errorMessage}>{error}</p>}
        <button className={Styles.btnDelete} onClick={deleteUser}>Eliminar Cuenta</button>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div >
  );
};
