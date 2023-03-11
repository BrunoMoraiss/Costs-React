import styles from './Home.module.css'
import Saving from '../../img/savings.svg'
import LinkButton from '../layouts/LinkButton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1 >Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo</p>
            <LinkButton text="Criar Projeto" to="/newproject" />
            <img src={Saving} alt='Logo Saving Costs'></img>
        </section>
    )
}

export default Home