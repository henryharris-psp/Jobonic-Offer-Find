import Link from "next/link"

const TopSection = (): React.ReactNode => {
    return(
      <section className="text-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-lg md:text-xl mb-8">Search through thousands of job listings and find the perfect fit for you.</p>
          <div className="flex flex-col md:flex-row justify-center items-center">
          <Link href='/login' className='btn btn-primary text-white w-48 rounded-lg h-12 mb-4 md:mr-4 md:mb-0 flex items-center justify-center'>Get Started</Link>
          </div>
        </div>
      </section>
    )
}

export default TopSection;