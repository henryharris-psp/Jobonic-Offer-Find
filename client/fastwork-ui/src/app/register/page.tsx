import FormContainer from '@/components/FormContainer'
import { RegisterForm } from './RegisterForm'
import Footer from '../footer'
import NavBar from '../../components/NavBar'

const RegisterPage = (): React.ReactNode => {
  return (
    <div className='min-h-screen w-full'>
      <NavBar showOnlyLogo></NavBar>
      <FormContainer className='mx-auto'>
        <RegisterForm />
      </FormContainer>
    </div>
  )
}

export default RegisterPage
