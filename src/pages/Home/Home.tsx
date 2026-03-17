import { useContext } from 'react'
import { UserContext } from '../../context/user-context'

const Home = () => {
  const {user} = useContext(UserContext)
  return (
    <div className='w-full max-h-min bg-blue-300 rounded-2xl p-2'>Home
      <p>Bem vindo, {user?.name}</p>
    </div>
  )
}

export default Home