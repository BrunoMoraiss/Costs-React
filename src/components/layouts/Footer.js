import {FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li className={styles.item}>  <FaFacebook size={styles.item}/>  </li>
                <li className={styles.item}> <FaInstagram size={styles.item}/> </li>
                <li className={styles.item}> <a href='https://www.linkedin.com/in/bruno-oliveira-morais/' className={styles.item}><FaLinkedin size={styles.item}/></a></li>
            </ul>
            <p className={styles.p}><span className={styles.span}>Costs</span> &copy; 2023</p>
        </footer>
    )
}

export default Footer