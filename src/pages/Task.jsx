import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, deleteTaskById } from '../services/tasks';

const Task = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTaskDetails = async () => {
      const taskData = await fetchTaskById(taskId);
      setTask(taskData);
      setLoading(false);
    };
    loadTaskDetails();
  }, [taskId]);

  const handleEditTask = () => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleMarkAsCompleted = async () => {
    await deleteTaskById(taskId);
    navigate('/dashboard');
  };

  const handleDeleteTask = async () => {
    await deleteTaskById(taskId);
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Cargando tarea...</p>
      ) : (
        <>
          <h2>{task.nombre}</h2>
          <p>Descripción: {task.descripcion}</p>
          <p>Estado: {task.estado}</p>
          <p>Fecha de Vencimiento: {task.fechaVencimiento}</p>
          <button onClick={handleEditTask} style={styles.button}>
            Editar Tarea
          </button>
          <button onClick={handleMarkAsCompleted} style={styles.button}>
            Marcar como Completada
          </button>
          <button onClick={handleDeleteTask} style={styles.button}>
            Eliminar Tarea
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
};

export default Task;
