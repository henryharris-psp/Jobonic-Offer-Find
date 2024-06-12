import NavBar from '../../components/NavBar'
import JobDescription from '@/components/JobDescription'

export default function LoginPage (): React.ReactNode {
  const jobData = {
    title: "Senior Frontend Developer",
    company: "Acme Inc.",
    location: "San Francisco, CA",
    description: "We are seeking an experienced Frontend Developer to join our growing team. In this role, you will be responsible for building and maintaining high-performance, scalable web applications using modern JavaScript frameworks and libraries.",
    responsibilities: [
      "Develop and implement complex user interfaces using React, Vue.js, or Angular",
      "Optimize web applications for performance, accessibility, and cross-browser compatibility",
      "Collaborate with designers and backend developers to ensure seamless integration",
      "Participate in code reviews and provide feedback to improve code quality",
      "Stay up-to-date with the latest frontend technologies and best practices"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or a related field",
      "5+ years of experience in frontend web development",
      "Proficient in JavaScript, HTML, and CSS",
      "Extensive experience with React, Vue.js, or Angular",
      "Familiarity with modern frontend tooling and build processes",
      "Strong problem-solving and critical thinking skills",
      "Excellent communication and collaboration skills"
    ],
    formTitle: "Apply for this role"
  }
  return (
    <div 
    className='flex flex-col min-h-screen w-full'
    >
      <NavBar></NavBar>
      <JobDescription data={jobData}></JobDescription>
    </div>
  )
}
