import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProjects } from '../services/projects';
import { getUserId } from '../services/tokenService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreProjects, setHasMoreProjects] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const userId = getUserId();
        const projectData = await fetchUserProjects(userId, page);
        if (projectData.length > 0) {
          setProjects((prevProjects) => [...prevProjects, ...projectData]);
        } else {
          setHasMoreProjects(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };
    loadProjects();
  }, [page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMoreProjects && !loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/projects/create');
  };

  return (
    <div style={styles.container} onScroll={handleScroll}>
      <h2>Mis Proyectos</h2>
      <div style={styles.projectContainer}>
        {projects.map((project) => (
          <div key={project.id} onClick={() => handleProjectClick(project.id)} style={styles.projectCard}>
            <h3>{project.nombre}</h3>
            <p>Fecha de Inicio: {project.fechaInicio}</p>
            <p>Fecha de Fin: {project.fechaFin}</p>
          </div>
        ))}
        {loading && <p>Cargando proyectos...</p>}
        {!hasMoreProjects && <p>No hay más proyectos para cargar.</p>}
      </div>
      <button onClick={handleCreateProject} style={styles.createButton}>
        Crear Proyecto
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    height: '100vh',
    overflowY: 'auto',
  },
  projectContainer: {
    maxHeight: '60vh',
    overflowY: 'auto',
    marginBottom: '20px',
  },
  projectCard: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    margin: '10px 0',
    cursor: 'pointer',
  },
  createButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;
