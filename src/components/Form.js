import { useState } from "react";

function Form({handleSubmit}){
    const[ userChoice, setUserChoice] = useState('');

    const handleChange = (e) => {
        setUserChoice(e.target.value);
    }

    
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userChoice);
        }}>
      <label htmlFor="orientationPicker">Choose pics orientation:</label>
      <select 
      id="orientationPicker"
      value={userChoice}
      onChange={handleChange}
      >
        <option value="" disabled>Please select:</option>
        <option value="square">square</option>
        <option value="landscape">landscape</option>
        <option value="portrait">portrait</option>
      </select>
      
      <button type="submit">Get the pic</button>
    </form>
    )
}

export default Form;