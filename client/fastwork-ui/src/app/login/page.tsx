import FormContainer from '@/components/FormContainer'
import { LoginForm } from '@/app/login/LoginForm'
import NavBar from '../section/navBar/NavBar'

export default function LoginPage (): React.ReactNode {
  return (
    <div 
    className='flex flex-col min-h-screen w-full'
    >
      <NavBar showOnlyLogo></NavBar>
      <FormContainer className='pt-20 mx-auto' >
        <LoginForm />
      </FormContainer>
    </div>
  )
}
