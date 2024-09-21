import { useState ,useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const [password, setpassword]=useState("")

  const passwordRef = useRef(null);
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "!@#$%&*_";
  
    if (numberAllowed && charAllowed) {
      // Include both numbers and special characters
      for (let i = 1; i < length; i++) {
        const randomNum = num.charAt(Math.floor(Math.random() * num.length*1));
        const randomChar = char.charAt(Math.floor(Math.random() * char.length+1));
        const randomStr = str.charAt(Math.floor(Math.random() * str.length+1));
        // Shuffle between the three
        pass += randomNum + randomChar + randomStr;
      }
    } else if (charAllowed) {
      // Include only special characters
      for (let i = 1; i < length; i++) {
        const randomChar = char.charAt(Math.floor(Math.random() * char.length+1));
        const randomStr = str.charAt(Math.floor(Math.random() * str.length+1));
        pass += randomChar + randomStr;
      }
    } else if (numberAllowed) {
      // Include only numbers
      for (let i = 0; i < length; i++) {
        const randomNum = num.charAt(Math.floor(Math.random() * num.length));
        const randomStr = str.charAt(Math.floor(Math.random() * str.length));
        pass += randomNum + randomStr;
      }
    } else {
      // Include only letters
      for (let i = 0; i < length; i++) {
        pass += str.charAt(Math.floor(Math.random() * str.length));
      }
    }
  
    // Ensure the password length does not exceed the specified length
    pass = pass.substring(0, length);
  
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);
  

useEffect(()=>{
  passwordgenerator();
},[length,numberAllowed,charAllowed,passwordgenerator]);

const copypasswordToClip=useCallback(()=>{
  passwordRef.current?.select();
  navigator.clipboard.writeText(password);
},[password] )

  return (
    <>
     <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 bg-gray-800 text-orange-500 '>
      <h1 className=' text-white text-center'> Password Generator</h1>
      <div  className=' flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" ref={passwordRef}  value={password}  className='outline-none w-full py-1 px-3' readOnly  placeholder='password'/>
        <button onClick={copypasswordToClip}  className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 ' >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div  className=' flex items-center  gap-x-1'>
          <input type="range" onChange={(e)=>{setlength(e.target.value)
          }} min={6} max={100} value={length} className=' cursor-pointer  '  />
           <label >Length:{length}</label>
        </div>
        <div  className=' flex items-center  gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' 
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }} />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div  className=' flex items-center  gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id='characterInput' 
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }} />
          <label htmlFor='characterInput'>Character</label>
        </div>
      </div>

    
     </div>
    </>
  )
}

export default App
