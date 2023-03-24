import React, { useCallback, useEffect, useState } from "react";
import styles from './styles.module.scss'
import { InputItem } from "../InputItem";

// Constants
import { ERRORS } from './constants/errors'

// Types
import { TypeOfInput } from './Types'

// Handlers
import { mappingTypeToInputType } from './handlers/mappingTypeToInputType'

type State = {
  name: string,
  type: TypeOfInput
  value: string
  required: boolean
  placeholder: string
  error: string
  validations: ((value: string) => boolean)[]
  onChange: (name: string, value: string) => void
}

type ItemType = {
  id: string,
  type: TypeOfInput,
  label: string,
  required: boolean,
  defaultValue?: string | number
}

export function FormState(props: any) {
  const { data } = props
  const [state, setState] = useState([])



  const updateStateValue = (name: string, values: { value?: string, error?: string }) => {
    setState((prevState: any): any => {
      const { value, error } = values
      const newState = [...prevState]
      return newState.map((item: State) => {

        if (item.name === name) {
          if (error) {
            item.error = error
          }
          if (value) {
            item.value = value
          }

        }

        return item
      })
    })
  }

  const emailValidation = (value: string) => {
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    return regExp.test(value) ? '' : ERRORS.WRONG_EMAIL
  }

  const passworValidation = (value: string) => {
    return value.length >= 8 ? '' : ERRORS.WRONG_PASSWORD
  }

  const requiredValidation = (value: string) => {
    if (value) {
      return value.trim() !== ''
    } else {
      return false
    }
  }

  const getValidation = (type: TypeOfInput, required = false) => {
    const validations = []

    if (type === 'inputEmail') {
      validations.push(emailValidation)
    } else if (type === 'inputPassword') {
      validations.push(passworValidation)
    }

    if (required) {
      validations.push(requiredValidation)
    }

    return validations
  }

  const validField = useCallback((name: string, value: string) => {
    let validations: any = []
    state.forEach((item: State) => {
      if (item.name === name) {
        validations = [...item.validations]
      }
    })

    const errors = validations.map((func : any) => {
      return func(value)
    })

    console.log(errors)
  }, [state])

  const onChange = (name: string, value: string) => {
    const errorValidation = validField(name, value)
    console.log(errorValidation)
    updateStateValue(name, { value })
  }


  const generateFormState = (item: ItemType) => {
    return ({
      name: item.id,
      type: mappingTypeToInputType(item.type),
      value: item.defaultValue || '',
      required: item.required,
      placeholder: item.label,
      validations: getValidation(item.type, item.required),
      onChange: onChange,
      errors: []
    })
  }

  useEffect(() => {
    if (data) {
      const newState = data.map((item: any) => {
        return generateFormState(item)
      })
      console.log(newState)
      setState(newState)
    }
  }, [data])



  return (
    <>
      {state.map((item: State) => (
        <InputItem key={item.name}
          type={item.type}
          name={item.name}
          value={item.value}
          placeholder={item.placeholder}
          onChange={item.onChange} />
      ))}
    </>
  )
}