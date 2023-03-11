import { useState, useEffect } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/input'
import Select from '../form/Select'
import Submit from '../form/Submit'

function ProjectForm({handleSubmit, textBtn, projectData}) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    useEffect(() => {
        fetch("http://localhost:3004/categories")
    .then((res) => res.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value})
    }

    const handleCategory = (e) => {
        setProject({...project, 
            category: {
                id: e.target.value, 
                name: e.target.options[e.target.value].text
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" value={project.name} text="Nome do projeto" name="name" placeholder="Inisira o nome do projeto" handleOnChange={handleChange}/>
            <Input type="number" value={project.budget} text="orçamento do projeto" name="budget" placeholder="Inisira o orçamento do projeto" handleOnChange={handleChange}/>
            <Select name="category_id" text="Selecione uma categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            <Submit text={textBtn}/>
        </form>
    )
}

export default ProjectForm