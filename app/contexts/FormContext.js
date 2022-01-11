import { createContext } from 'react';


// form context
const FormContext = createContext({
  form: {},
  handleFormInputChange: () => {},
  handleIconSelect: () => {},
  handleOptionSelect: () => {},
  handleCollectionSelect: () => {},
});

export default FormContext;