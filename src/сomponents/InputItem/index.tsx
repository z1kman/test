import React from "react";
import styles from './styles.module.scss'
import { Input } from "../Input";


type TypeOfInput = 'inputText' | 'inputEmail' | 'inputPassword'

type Props = {
  name: string,
  type: TypeOfInput,
  placeholder: string,
  value: string
  onChange: (name: string, value: string) => void 
}

export function InputItem (props: Props) {

  return (
    <div className={styles.InputItem}>
      <Input {...props} />
    </div>
  )
}