import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateUser, uploadProfilePhoto } from "../services/UserService";
import "./MyProfile.css";

const MyProfile = () => {
  const { user, login, loading } = useAuth();
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

      if (photoFile) {
        const data = new FormData();
        data.append("foto", photoFile);
        data.append("userId", user.id);
        const res = await uploadProfilePhoto(data);
        fotoNombre = res.nombreArchivo;
      }


      await updateUser(user.id, { nombre, fotoPerfil: fotoNombre });
      login({ ...user, nombre, fotoPerfil: fotoNombre });
      
      setEditMode(false);
      alert("¡Perfil actualizado!");
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  const handleCancel = () => {
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
          {/* SECCIÓN IZQUIERDA (IMAGEN) */}
          <div className="profile-image-section">
            {photoPreview ? (
              <img src={photoPreview} alt="Perfil" className="profile-avatar" />
            ) : (
              <div className="profile-avatar" style={{display: 'flex', alignItems:'center', justifyContent:'center', background:'#333', fontSize:'3rem'}}>
                {user.nombre?.charAt(0).toUpperCase()}
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{display: 'none'}} 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPhotoFile(file);
                  setPhotoPreview(URL.createObjectURL(file));
                }
              }}
              accept="image/*"
            />
            
            {editMode ? (
              <button className="btn-change-photo" onClick={() => fileInputRef.current.click()}>
                Cambiar foto
              </button>
            ) : (
              <span className="role-badge">Miembro Premium</span>
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
                <button className="save-btn" onClick={() => setEditMode(true)}>
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;