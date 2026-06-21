import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask === '') return;
    await addDoc(collection(db, 'todos'), {
      text: newTask,
      completed: false,
    });
    setNewTask('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Менеджер задач</h2>
      
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Что нужно сделать?" 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Добавить
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px', background: '#fff' }}>
            <input type="checkbox" checked={task.completed} readOnly />
            <span style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#999' : '#000' }}>
              {task.text}
            </span>
            <button style={{ padding: '5px 10px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;