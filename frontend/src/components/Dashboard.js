import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';

function Dashboard() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
      setError('');
    } catch (err) {
      setError('Błąd pobierania elementów');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/items/${editingItem.id}`, formData);
      } else {
        await api.post('/items', formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '' });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.detail || 'Błąd zapisu');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten element?')) {
      try {
        await api.delete(`/items/${id}`);
        fetchItems();
      } catch (err) {
        setError('Błąd usuwania elementu');
      }
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ title: '', description: '' });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>CRUD App</h1>
          <div className="navbar-right">
            <span>Witaj, {user?.username}!</span>
            <button onClick={logout}>Wyloguj</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="items-list">
          <div className="items-header">
            <h2>Moje elementy</h2>
            <button className="btn btn-success" onClick={openCreateModal}>
              Dodaj nowy
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div>Ładowanie...</div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>Brak elementów. Dodaj swój pierwszy element!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.title}</h3>
                <p>{item.description || 'Brak opisu'}</p>
                <div className="item-card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingItem ? 'Edytuj element' : 'Dodaj nowy element'}</h2>
            <form onSubmit={handleCreateOrUpdate}>
              <div className="form-group">
                <label>Tytuł</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Opis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Anuluj
                </button>
                <button type="submit" className="btn btn-success">
                  {editingItem ? 'Zapisz' : 'Dodaj'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
