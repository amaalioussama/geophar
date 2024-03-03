"use client"
import axios from 'axios';
import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LogoImage from '../../../public/pharmacie.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password
      });
  
      const { message } = response.data;
  
      if (message === 'Login successful') {
        localStorage.setItem('isLoggedIn', 'true');

        router.push("http://localhost:3000/localsearch");
      } else {
      
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <Sheet
      sx={{
        width: 300,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: '0px 4px 4px rgba(0, 255, 0, 0.25)', 
      }}
      variant="outlined"
    >
      <div style={{ textAlign: 'center' }}>
        <Image src={LogoImage} alt="Pharmacy Logo" className='ml-20' width={100} height={100} />
      </div>
      <Typography level="h4" className='ml-20' >Welcome!</Typography>
      <Typography level="body-sm" className='ml-9'>You should be Admin to login.</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="test@email.com"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button sx={{ mt: 1 }} type="submit" className='mt-5 ml-24 bg-green-500 hover:bg-green-800'>Log in</Button>
        {error && <Typography sx={{ color: 'error.main', mt: 1 }}>{error}</Typography>}
      </form>
    </Sheet>
  );
}

export default Login;
