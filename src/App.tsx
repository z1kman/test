import React from 'react';

import { FormState } from './сomponents/Form'

function App() {
  return (
    <div className="App">
      <FormState data={[
        {
          id: "first_name",
          type: "inputText",
          label: "First Name",
          defaultValue: "Some first name"
        },
        {
          id: "last_name",
          type: "inputText", label: "Last Name"

        }, {
          id: "email",
          type: "inputEmail",
          label: "Email",
          required: true
        }, {
          id: "password",
          type: "inputPassword",
          label: "Password",
          required: true
        }]} />
      {/* <InputItem type='inputEmail' label={'Введите email'} id={'121'} required={false} />
      <InputItem type='inputPassword' label={'Введите email'} id={'121'} required={false} />
      <InputItem type='inputText' label={'Введите email'} id={'121'} required={false} /> */}
    </div>
  );
}

export default App;
