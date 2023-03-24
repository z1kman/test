import { TypeOfInput } from '../Types'

export const mappingTypeToInputType = (type: TypeOfInput) => {
  if (type === 'inputText') {
    return 'text'
  } else if (type === 'inputEmail') {
    return 'email'
  } else if (type === 'inputPassword') {
    return 'password'
  } else {
    return 'text'
  }
}