import React from "react";
import { Button, Card, Title } from "../../../components";
import styles from './styles.module.less'

const TitleExemple = () => {
  return (
    <div className={styles.buttonExemple}>
      <Title title="Title"></Title>
      <Title type="tooltip" title="Title"></Title>
    </div>
  )
}
export default TitleExemple