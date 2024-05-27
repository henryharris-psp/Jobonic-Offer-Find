
import NavBar from '../../components/NavBar'
import JobDescription from '@/components/JobDescription'

export default function LoginPage (): React.ReactNode {
  return (
    <div 
    className='flex flex-col min-h-screen w-full'
    >
      <NavBar></NavBar>
      <JobDescription></JobDescription>
    </div>
  )
}
