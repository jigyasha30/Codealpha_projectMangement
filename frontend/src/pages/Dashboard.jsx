import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ==========================
  // States
  // ==========================

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [selectedProject, setSelectedProject] = useState("");

  // ==========================
  // Fetch Projects
  // ==========================

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load projects");
    }
  };

  // ==========================
  // Fetch Tasks
  // ==========================

  const fetchTasks = async () => {
    try {
      if (!selectedProject) {
        setTasks([]);
        return;
      }

      const token = localStorage.getItem("token");

      const res = await API.get(
        `/tasks/project/${selectedProject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load tasks");
    }
  };
    // ==========================
  // Create Project
  // ==========================

  const createProject = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        alert("Please fill all project fields");
        return;
      }

      const token = localStorage.getItem("token");

      await API.post(
        "/projects",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchProjects();

      alert("Project Created Successfully!");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create project");
    }
  };

  // ==========================
  // Delete Project
  // ==========================

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project Deleted Successfully!");

      fetchProjects();

      if (selectedProject === projectId) {
        setSelectedProject("");
        setTasks([]);
      }

    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete project");
    }
  };

  // ==========================
  // Create Task
  // ==========================

  const createTask = async () => {
    try {
      if (!selectedProject) {
        alert("Please select a project");
        return;
      }

      if (!taskTitle.trim() || !taskDescription.trim()) {
        alert("Please fill all task fields");
        return;
      }

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title: taskTitle,
          description: taskDescription,
          project: selectedProject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created Successfully!");

      setTaskTitle("");
      setTaskDescription("");

      fetchTasks();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create task");
    }
  };
    // ==========================
  // Update Task Status
  // ==========================

  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to update task");
    }
  };

  // ==========================
  // Delete Task
  // ==========================

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Deleted Successfully!");

      fetchTasks();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  // ==========================
  // Logout
  // ==========================

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ==========================
  // Effects
  // ==========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  return (
        <div className="dashboard">

      {/* Header */}

      <div className="header">
        <h1>Project Management Dashboard</h1>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* ==========================
          Project Section
      ========================== */}

      <div className="section">

        <h2>Projects</h2>

        <div className="form-row">

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="create-btn"
            onClick={createProject}
          >
            Create Project
          </button>

        </div>

        {projects.length === 0 ? (
          <p className="empty-message">
            No Projects Found
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="project-card"
            >
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <button
                className="delete-btn"
                onClick={() => deleteProject(project._id)}
              >
                Delete Project
              </button>

            </div>
          ))
        )}

      </div>
            {/* ==========================
          Task Section
      ========================== */}

      <div className="section">

        <h2>Tasks</h2>

        <div className="form-row">

          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}
          </select>

          <button
            className="create-btn"
            onClick={createTask}
          >
            Create Task
          </button>

        </div>

        {tasks.length === 0 ? (
          <p className="empty-message">
            No Tasks Found
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-card"
            >
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <div className="task-actions">

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(
                      task._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;