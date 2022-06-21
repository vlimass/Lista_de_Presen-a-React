import { useState, useEffect } from 'react';
import './style.css';

// Components
import { Card, CardInfo } from '../../components/Card';

type ProfileResponse = {
  name: string,
  avatar_url: string,
}

type User = {
  name: string,
  avatar: string,
}

function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardInfo[]>([]);
  const [user, setUser] = useState<User>({} as User)

  const handleAddStudent = () => {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
      )
    }

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/vlimass');
      const data = await response.json() as ProfileResponse;
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }

    fetchData();

    // Outra forma de fazer:
    // fetch('https://api.github.com/users/vlimass')
    // .then(response => response.json())
    // .then( data => {
    //   setUser({
    //     name: data.name,
    //     avatar: data.avatar_url,
    //   })
    // })

  }, [students]);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1> 
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite um nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      
      { students.map(student => <Card name={student.name} time={student.time} key={student.time}/>) }
     
    </div>
  )
}

export default Home;
