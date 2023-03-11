import styles from './NewProject.module.css'
import ProjectFrom from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'

function NewProject(){

    const navigate = useNavigate()

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch("http://localhost:3004/projects", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then((data) => {
            console.log(data)
            navigate('/projects', { state: {message: 'Projeto criado com sucesso!'} })
        })
        .catch((err) => console.log(err))
    }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectFrom textBtn="Criar Projeto" handleSubmit={createPost}/>
        </div>
    )
}

export default NewProject