import React, { useState } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import openai, { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { OpenAIApi } from 'openai';
const completion:any = new ChatCompletionRequestMessageRoleEnum();

function App() {
  const [response, setResponse] = useState("");
  const [input, setInput]=useState('');
  const fetchOpenAI = async (inputText:string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: inputText,
          max_tokens: 5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${'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'}`,
          },
        }
      );
      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEnterText=(text:string)=>{
    setInput(text)
  }
  return (
    <div>
      <input onChange={e=>handleEnterText(e.target.value)}/> 
      <br/>
      <button onClick={()=>fetchOpenAI(input)}>Fetch OpenAI API</button>
    
      <p>{response}</p>
    </div>
  );
}

export default App;
