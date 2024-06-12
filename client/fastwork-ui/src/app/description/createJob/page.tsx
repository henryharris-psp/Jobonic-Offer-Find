
import FormContainer from '@/components/FormContainer'
import NavBar from '../../../components/NavBar'
import { CreateJobForm } from './CreateJobForm'

const CreateJob = (): React.ReactNode => {
    return (
      <div className='min-h-screen w-full'>
        <NavBar></NavBar>
        <FormContainer className='mx-auto' marginTop='mt-10'>
          <CreateJobForm />
        </FormContainer>
      </div>
    )
}

export default CreateJob
