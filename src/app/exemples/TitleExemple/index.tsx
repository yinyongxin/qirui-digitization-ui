import React from "react";
import { Button, Card, Title } from "../../../components";
import styles from './styles.module.less'

const TitleExemple = () => {
  return (
    <div className={styles.buttonExemple}>
      <Title title="基础 text"></Title>
      <Title type="tooltip" title="带有下边框 tooltip"></Title>
    </div>
  )
}
export default TitleExemple