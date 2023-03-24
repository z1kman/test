import React from "react";
import styles from './styles.module.scss'

export function Input(props: any) {
  const { onChange, name, otherProps } = props
  return (
    <input
      className={styles.Input}
      onChange={(event) => onChange(name, event.target.value)}
      {...otherProps} />
  )
}