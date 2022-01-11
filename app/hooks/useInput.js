import { useState } from "react"; 

const useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	// handling input change
	const handleChange = (event) => setValue(event.target.value);

	return {
		value,
		onChange: handleChange
	};
};


export default useInput;