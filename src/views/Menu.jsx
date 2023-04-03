import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Menu = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogout = () => {
    axios
      .post("https://eventapp-backend-production.up.railway.app/auth/logout")
      .then((response) => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(
          `https://eventapp-backend-production.up.railway.app/users/${user.id}`
        )
        .then((response) => {
          setName(response.data.name);
          setLastName(response.data.lastName);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleUpdateUser = () => {
    const updatedUser = {
      name: name,
      lastName: lastName,
    };
    axios
      .patch(
        `https://eventapp-backend-production.up.railway.app/users/${user.id}`,
        updatedUser
      )
      .then((response) => {
        console.log(response.data);
        alert("Usuario actualizado");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-4 d-flex justify-content-center">
      {user && (
        <h2>
          Bienvenido {name} {lastName}
        </h2>
      )}
      <div className="btn-group-vertical w-80 d-flex justify-content-center">
        <Link to="/crearevento" className="btn btn-primary mb-3 btn-block">
          Crear nuevo evento
        </Link>
        <Link to="/Favorites" className="btn btn-primary mb-3 btn-block">
          Ver eventos guardados
        </Link>
        <Link to="/profile" className="btn btn-primary mb-3 btn-block">
          Modificar datos
        </Link>
        <button
          onClick={handleLogout}
          className="btn btn-danger mb-3 btn-block"
        >
          Cerrar sesión
        </button>
        <button
          onClick={handleUpdateUser}
          className="btn btn-primary mb-3 btn-block"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default Menu;
