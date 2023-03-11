import styles from './Submit.module.css'

function Input({text}){
    return (
        <div>
            <input type="submit" value={text} className={styles.btn}/>    
        </div> 
    )
}

export default Input