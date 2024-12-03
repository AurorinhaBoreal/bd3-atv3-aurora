import Header from '../components/Header'
import List from '../components/List'
import RegisterForm from '../components/RegisterForm'
import '../styles/main.css'

function Home() {

  return (
    <>
      <Header/>
      <div style={{display: "flex"}}>
        <RegisterForm/>
        <List/>
      </div>
    </>
  )
}

export default Home
