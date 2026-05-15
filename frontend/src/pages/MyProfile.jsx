import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateUser, uploadProfilePhoto } from "../services/UserService";
import "./MyProfile.css";

const MyProfile = () => {
  const { user, login, logout, loading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const fileInputRef = useRef(null);
  const API_BASE_URL = "http://localhost:8080";

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      if (user.fotoPerfil) {
        setPhotoPreview(`${API_BASE_URL}/images/user/${user.fotoPerfil}`);
      }
    }
  }, [user]);

  const handleSave = async () => {
    try {
      let fotoNombre = user.fotoPerfil;

      // Si has elegido una foto nueva durante el modo edición, la subimos ahora
      if (photoFile) {
        const data = new FormData();
        data.append("foto", photoFile);
        data.append("userId", user.id);
        const res = await uploadProfilePhoto(data);
        fotoNombre = res.nombreArchivo; 
      }

      // Guardamos en BD
      await updateUser(user.id, { nombre, fotoPerfil: fotoNombre });

      // Actualizamos tu Contexto y LocalStorage
      login({ ...user, nombre, fotoPerfil: fotoNombre });

      // Limpiamos y salimos del modo edición
      setEditMode(false);
      setPhotoFile(null);
      setPhotoPreview(`${API_BASE_URL}/images/user/${fotoNombre}`);

    } catch (err) {
      console.error(err);
      alert("Error al guardar los cambios");
    }
  };

  const handleCancel = () => {
    // Si cancela, devolvemos todo a como estaba antes
    setNombre(user.nombre || "");
    setPhotoFile(null);
    setPhotoPreview(user.fotoPerfil ? `${API_BASE_URL}/images/user/${user.fotoPerfil}` : null);
    setEditMode(false);
  };

  if (loading) return <div className="page-wrapper"><Navbar /><p>Cargando...</p></div>;
  if (!user) return <div className="page-wrapper"><Navbar /><p>No has iniciado sesión.</p></div>;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="profile-page-wrapper">
        <header className="profile-header">
          <h1 className="text-gradient">Configuración de Perfil</h1>
        </header>

        <div className="profile-main-card">
          <div className="profile-image-section">
            {photoPreview ? (
              <img src={photoPreview} alt="Perfil" className="profile-avatar" />
            ) : (
              <div className="profile-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333', fontSize: '3rem' }}>
                {user.nombre?.charAt(0).toUpperCase()}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPhotoFile(file);
                  setPhotoPreview(URL.createObjectURL(file)); // Preview instantánea
                }
              }}
              accept="image/*"
            />

            {/* SOLO sale si le has dado a Editar Perfil */}
            {editMode && (
              <button className="btn-change-photo" onClick={() => fileInputRef.current.click()}>
                Cambiar foto
              </button>
            )}

          </div>

          <div className="profile-content">
            <div className="profile-title-row">
              <h2>{editMode ? "Editando Perfil" : "Datos de Usuario"}</h2>
            </div>

            <div className="input-group">
              <label>Nombre Completo</label>
              <input
                className={`profile-input ${!editMode ? 'readonly' : ''}`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                readOnly={!editMode}
              />
            </div>

            <div className="input-group">
              <label>Correo Electrónico (No editable)</label>
              <input
                className="profile-input readonly"
                value={user.email}
                readOnly
              />
            </div>

            <div className="profile-actions">
              {editMode ? (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    Guardar Cambios
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button className="save-btn" onClick={() => setEditMode(true)}>
                    Editar Perfil
                  </button>
                  <button className="logout-btn" onClick={logout}>
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;