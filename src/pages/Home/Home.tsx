import { useContext } from 'react'
import { UserContext } from '../../context/user-context'

const Home = () => {
  const {user} = useContext(UserContext)
  return (
    <div>Home
      <p>nome: {user?.name}</p>
    </div>
  )
}

export default Home