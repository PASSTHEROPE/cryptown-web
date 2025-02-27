import './signup.css'
import { useSignup } from "../../hooks/useSignup"
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import img from '../../asset/signup.png'
import logo from '../../asset/Assetlogo.png'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  //ui 
  const toRotate = [ "Traders!"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const dataperiod = 2000;

  const {signup, error, status, isLoading} = useSignup();

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(dataperiod);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, username, password, confirmPass)
  }


return (
     <div>
		<h5>SIGNUP</h5>
    <form className='signup' onSubmit={handleSubmit}>
      <input type ='email' placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
      <input type ='username' placeholder='Create Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
      <input type ='password' placeholder='Crate Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
      <input type ='confirmPass' placeholder='Confrim Password' onChange={(e) => setconfirmPass(e.target.value)} value={confirmPass}/>
      <button disabled={isLoading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
      <p>{status}</p>
   </form>
    </div>

)}

export default Signup