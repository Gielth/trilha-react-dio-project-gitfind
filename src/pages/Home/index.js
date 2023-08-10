import { useState } from 'react';
import { Header } from '../../componentes/Header';
import background from '../../assets/background.png';
import './styles.css';
import ItemList from '../../componentes/ItemList';


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repositories, setRepositories] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json()

    if (newUser.name) {
      const { login, avatar_url, name, bio } = newUser;
      setCurrentUser({ login, avatar_url, name, bio })

      const repositoriesData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newUserRepository = await repositoriesData.json()

      if (newUserRepository.length) {
        setRepositories(newUserRepository);
      }
    }
  }




  return (
    <div className="App">
      <Header></Header>
      <div className="content">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <input name="username" placeholder="@username" value={user} onChange={event => setUser(event.target.value)} />
          <button onClick={handleGetData}>Buscar</button>
          {currentUser?.name ? (
            <>
              <div className="profile-info">
                <img src={currentUser.avatar_url} className="profile-image" alt="Foto de perfil" />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>) : null}
          {repositories?.length ? (
            <div>
              <h4>Repositorios</h4>
              {repositories.map((repository) => {
                return (<ItemList title={repository.name} description={repository.description} />)
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
