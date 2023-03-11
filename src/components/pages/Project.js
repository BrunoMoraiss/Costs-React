import styles from './Project.module.css'

import {v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setProjectForm] = useState(false)
    const [variavelAmbiente, setVariavelAmbiente] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setServiceForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3004/projects/${id}`, {
            method: "GET"
        }).then((resp) => resp.json())
            .then((data) => {
                setTimeout(() => {
                    setProject(data)
                    setServices(data.services)
                }, 300)
            }).catch((err) => {
                console.log(err)
            })
    }, [id, variavelAmbiente])

    function editPost(project) {

        if (project.budget < project.cost) {
            setMessage("Estorou o orçamento do projeto")
            setType("error")
            return false
        }

        fetch(`http://localhost:3004/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => {
            resp.json()
        })
            .then((data) => {
                setVariavelAmbiente(!variavelAmbiente)
                setProjectForm(false)
                setMessage("Projeto Atualizado com sucesso")
                setType("success")
            }).catch((err) => { console.log(err) })
    }

    function toogleProjectForm() {
        setProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setServiceForm(!showServiceForm)
    }

    function removeService(id, cost){
        const servicesUpdated = services.filter((service) => service.id !== id)

        let projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = projectUpdated.cost - cost

        fetch(`http://localhost:3004/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setMessage("Serviço excluido com sucesso")
            setType("success")
            setVariavelAmbiente(!variavelAmbiente)
        })
    }

    function createService(project) {
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassdo")
            setType("error")
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:3004/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setServiceForm(!showServiceForm)
                setVariavelAmbiente(!variavelAmbiente)
            })
}

return (<>
    {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>{project.name}</h1>
                    <button className={styles.btn} onClick={toogleProjectForm}>
                        {!showProjectForm ? "Editar Projeto" : "Fechar"}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span> {project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm textBtn="Concluir Edição" handleSubmit={editPost} projectData={project} />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_conatiner}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toogleServiceForm}>
                        {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm &&
                            <ServiceForm handleSubmit={createService} btnText="Adicionar o Serviço" projectData={project} />
                        }
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard 
                                id={service.id}
                                name={service.name}
                                description={service.description}
                                cost={service.cost}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))
                    ) : (
                        <p>Não há serviços</p>
                    )}
                </Container>
            </Container>
        </div>
    ) : (
        <Loading />
    )}
</>
)
}

export default Project