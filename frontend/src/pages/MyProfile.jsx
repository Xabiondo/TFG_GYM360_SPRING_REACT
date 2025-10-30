import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const MyProfile = () => {

    const [usuario, setUsuario] = useState(null);
    useEffect(() => {

         const userData = localStorage.getItem("user");


        if (userData) {
            const datosJson = JSON.parse(userData)
            if (datosJson.success) {
                setUsuario(datosJson)
                console.log(datosJson)
            }
        }
    }, [])

    if (!usuario) {
        return(
            <div>
                <Navbar></Navbar>
                <h1>Inicia sesión para ver tus datos</h1>
            </div>
        )
       
    }
    return(
    <div className="perfil-container">
        <Navbar></Navbar>
      <h2>Mi Perfil</h2>
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>ID:</strong> {usuario.id}</p>
      </div>
    </div>

    )

}
export default MyProfile