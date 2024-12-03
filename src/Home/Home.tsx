import '../styles/main.css'
import Header from '../components/Header'
import List from '../components/List'
import RegisterForm from '../components/RegisterForm'
import styles from './home.module.css'

function Home() {

  return (
    <>
      <Header/>
      <div className={styles.pageBody} style={{display: "flex"}}>
        <RegisterForm/>
        <List/>
      </div>
    </>
  )
}

export default Home
