import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, deleteProjectById, completeProjectById } from '../services/projects';
import { fetchTasksByProjectId } from '../services/tasks';

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        const projectData = await fetchProjectById(id);
        setProject(projectData);
        const taskData = await fetchTasksByProjectId(id, page);
        setTasks(taskData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProjectDetails();
  }, [id, page]);

  const handleScroll = async (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setLoading(true);
      const nextPage = page + 1;
      try {
        const moreTasks = await fetchTasksByProjectId(id, nextPage);
        setTasks((prevTasks) => [...prevTasks, ...moreTasks]);
        setPage(nextPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditProject = () => {
    navigate(`/projects/edit/${id}`);
  };

  const handleMarkAsCompleted = async () => {
    await completeProjectById(id);
    navigate('/dashboard');
  };

  const handleDeleteProject = async () => {
    await deleteProjectById(id);
    navigate('/dashboard');
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div style={styles.container}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message display */}
      <h2>{project.nombre}</h2>
      <p>Descripción: {project.descripcion}</p>
      <p>Fecha de Inicio: {project.fechaInicio}</p>
      <p>Fecha de Fin: {project.fechaFin}</p>
      <button onClick={handleEditProject} style={styles.button}>
        Editar Proyecto
      </button>
      <button onClick={handleMarkAsCompleted} style={styles.button}>
        Marcar como Terminado
      </button>
      <button onClick={handleDeleteProject} style={styles.button}>
        Eliminar Proyecto
      </button>
      <div onScroll={handleScroll} style={styles.taskContainer}>
        {tasks.map((task) => (
          <div key={task.id} onClick={() => handleTaskClick(task.id)} style={styles.taskCard}>
            <h3>{task.nombre}</h3>
            <p>Estado: {task.estado}</p>
            <p>Responsable: {task.responsableNombre}</p>
            <p>Fecha de Vencimiento: {task.fechaVencimiento}</p>
          </div>
        ))}
        {loading && <p>Cargando tareas...</p>}
      </div>
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
  taskContainer: {
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  taskCard: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    margin: '10px 0',
    cursor: 'pointer',
  },
};

export default Project;
