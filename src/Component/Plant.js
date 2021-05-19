import React from 'react'
import styles from './Plant.module.css'
const Plant = ({plant, choosePlant}) => {
    const choosePlantHandler = () => choosePlant(plant.id);
    return<p className={styles.Plant} onClick={choosePlantHandler}>{plant.name}</p>
}
export default Plant