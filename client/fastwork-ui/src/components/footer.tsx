import React from 'react';

const Footer = (): React.ReactNode => {
  return (
    <footer className='bg-gradient-to-t from-[#0C2348] to-[#386680] w-full text-white'>
      {/* bottom navigation */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-8'>
        {/* How to Use Column */}
        <div>
          <h3 className='text-md font-semibold mb-4'>How to Use</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href='/createProfile' className='hover:underline'>Apply to be a freelancer</a></li>
            <li><a href='/start-selling' className='hover:underline'>How to start selling work</a></li>
            <li><a href='/commissions-payment' className='hover:underline'>Commissions Payment</a></li>
            <li><a href='/employment-guarantee' className='hover:underline'>Employment Guarantee</a></li>
            <li><a href='/knowledge-blog' className='hover:underline'>Knowledge Blog</a></li>
            <li><a href='/faq' className='hover:underline'>Frequently Asked Questions</a></li>
            <li><a href='/data-usage' className='hover:underline'>Manage Data Usage</a></li>
          </ul>
        </div>
        {/* Product Column */}
        <div>
          <h3 className='text-md font-semibold mb-4'>Product</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href='/' className='hover:underline'>Jobonic</a></li>
            {/*<li><a href='/jobonic-business' className='hover:underline'>Jobonic for Business</a></li>*/}
          </ul>
        </div>
        {/* About Us Column */}
        <div>
          <h3 className='text-md font-semibold mb-4'>About Us</h3>
          <ul className='space-y-2 text-sm'>
            {/*<li><a href='/company' className='hover:underline'>Feedback</a></li>*/}
            <li><a href='/careers' className='hover:underline'>Careers</a></li>
            <li><a href='/terms-conditions' className='hover:underline'>Terms and Conditions</a></li>
            <li><a href='/privacy-policy' className='hover:underline'>Privacy Policy</a></li>
          </ul>
        </div>
        {/* Contact Us Column */}
        <div>
          <h3 className='text-md font-semibold mb-4'>Contact Us</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href='/contact' className='hover:underline'>Drop us a message or feedback</a></li>
            <li><a href='mailto:jobonic@gmail.com' className='hover:underline'>Email</a></li>
            <li><a href='line://ti/p/@yourlineid' className='hover:underline'>LINE</a></li>
          </ul>
        </div>
      </div>
      {/* footer */}
      <div className='bg-gray-400 sm:flex sm:flex-row text-white sm:justify-between sm:items-center flex flex-col-reverse justify-center items-center gap-6 sm:px-6 py-2'>
        <ul className='flex'>
          <li className='sm:pl-20 pl-10 text-sm font-normal'>&copy; 2024 Laconic Tech. All rights reserved.</li>
        </ul>
        <ul className='flex sm:space-x-6 pl-8 flex-row justify-between mr-16'>
          <li className='whitespace-no-wrap text-sm font-normal mr-6 sm:mr-0'><a href='/terms-and-condition'>Terms & Conditions</a></li>
          <li className='whitespace-no-wrap text-sm font-normal'><a href='/privacy-policy'>Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
