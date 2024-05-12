import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import NavigationCent from './pages/Auth/NavigationCent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <NavigationCent />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
