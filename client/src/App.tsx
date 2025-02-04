import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import cn from 'classnames'

const fecthData = async () => {
  const response = await fetch('http://localhost:3000/');
  const data = await response.json()
  return data;
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<{message: string} | null>(null)

  useEffect(() => {
    fecthData().then(setData)
  }, [])

  return (
    <>
      <div>
        <a>
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a>
          <img src={reactLogo} className={cn(styles.logo, styles.react)} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {data?.message}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
