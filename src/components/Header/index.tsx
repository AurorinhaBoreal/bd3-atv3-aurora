import logo from '../../assets/firebase_react.png'
import styles from './header.module.css'

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <img className={styles.headerLogo} src={logo} aria-label='Logo do React Laranja com logo do Firebase no meio'/>
            <h2 className={styles.headerTitle}>
                Fireact
            </h2>
            <hr className={styles.headerDivider}/>
            <h3 className={styles.headerSlogan}>
                Project that uses Firebase and React (Duh)
            </h3>
        </div>
    )
}

export default Header;