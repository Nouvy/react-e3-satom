import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bonjour from './components/Bonjour.jsx'
import ListGroup from './components/ListGroup.jsx'
import Carte from "./components/Carte.jsx";
import Bouton from "./components/Bouton.jsx";
import LikeButton from "./components/LikeIncrement.jsx";
import Like from "./components/Like.jsx";
import ContactForm from "./components/ContactForm.jsx";

function App() {
  const [count, setCount] = useState(0)

    const handleClick = () => {
        alert('Vous avez cliqué !');
    };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
        <Bonjour nom={ "Fabrice" } />
        <ListGroup items={['item 1', 'item 2', 'item 3', 'item 4']} />
        <Carte>
            <h2>Titre 2</h2>
            <p>Contenu 2</p>
        </Carte>
        <LikeButton />
        <Like initialLikes={10} initiallyLiked={true} />
        <Bouton onClick={handleClick} />
        <ContactForm />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
