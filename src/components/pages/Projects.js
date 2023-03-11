import Message from '../layouts/Message'
import styles from './Projects.module.css'
import { useLocation } from 'react-router-dom'
import Container from '../layouts/Container'
import LinkButton from '../layouts/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../layouts/Loading'

function Projects() {

    const [messageDelete, setMessageDelete] = useState("")

    function removeProject(id){
        fetch(`http://localhost:3004/projects/${id}`, {
            method: "DELETE"
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
            setMessageDelete("Projeto Excluido com sucesso")
        })
        .catch((err) => console.log(err))
    }

    const [projects, setProjects] = useState([])

    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3004/projects", {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((data) => {
                    setProjects(data)
                    console.log(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message msg={message} type="success" />}
            {messageDelete.length > 1 && <Message msg={messageDelete} type="success" />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects