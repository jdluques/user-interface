import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserById, updateUserById, deleteUserById } from "../services/user";
import { getUserId, getToken, deleteTokenAndId } from "../services/tokenService";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const navigate = useNavigate();
    const token = getToken();
    const userId = getUserId();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const fetchedUser = await fetchUserById(userId, token);
                setUser(fetchedUser);
                setUpdatedName(fetchedUser.nombre);
                setUpdatedEmail(fetchedUser.email);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        loadUserData();
    }, [userId, token]);

    const handleEdit = async () => {
        try {
            await updateUserById(userId, { nombre: updatedName, email: updatedEmail }, token);
            setUser({ ...user, nombre: updatedName, email: updatedEmail });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUserById(userId, token);
            deleteTokenAndId();
            navigate("/login");
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Perfil</h2>
            {isEditing ? (
                <div>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Correo electrónico:
                        <input
                            type="email"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleEdit}>Guardar cambios</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <p>Nombre: {user.nombre}</p>
                    <p>Correo electrónico: {user.email}</p>
                    <button onClick={() => setIsEditing(true)}>Editar perfil</button>
                </div>
            )}
            <br />
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
                Eliminar perfil
            </button>
        </div>
    );
};

export default Profile;
