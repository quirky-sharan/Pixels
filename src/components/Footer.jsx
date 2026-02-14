import React from 'react';

const Footer = () => {
  return (
    <div data-scroll data-scroll-section  className='relative px-[3.922vw] py-10 w-full bg-zinc-800 z-10'>
        <div className='flex items-start justify-between'>
      <div className='w-1/2 h-screen  flex flex-col justify-between'>
        <div>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">STORIES</h1>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">LIVE</h1>
        </div>
        
      </div>
      <div className='w-1/2 h-full '>
        <div className='flex flex-col gap-10'>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">FOREVER</h1>
          
          <div className='flex flex-col gap-0'>
            <span className='mb-4'>C:</span>
            <span>Instagram</span>
            <span>Community Forum</span>
            <span>Story Circles</span>
            <span>Global Contributors</span>
          </div>

          <div className='flex items-center justify-between pr-7'>
            <div className='flex flex-col gap-0 '>
              <span className='mb-4'>H:</span>
              <span>Digital Archive</span>
              <span className='mb-4'>Global Access</span>
              <span>Open Story Library</span>
              <span>Preserved Traditions</span>
            </div>

            <div className='flex flex-col gap-0'>
              <span className='mb-4'>N:</span>
              <span>Home</span>
              <span>Explore</span>
              <span>Featured Regions</span>
              <span>About</span>
              <span>Contribute</span>
              <span>Contact</span>
            </div>
          </div>

          <div className='flex flex-col gap-0'>
            <span className='mb-4'>E:</span>
            <span>pixels@xyz.world</span>
          </div>
        </div>
      </div>
      </div>

      <div className='flex mt-10 '>
        <div className='w-1/2 '>
        <div>
          <svg
            width="72"
            height="30"
            viewBox="0 0 72 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.8393 10.2032C4.22951 10.3257 -0.0459221 14.7356 0.000372391 20.2752C0.0412204 25.3548 4.57808 30.3608 10.6862 29.9226C15.5145 29.5768 19.9015 25.4119 19.8525 20.0057C19.8035 14.5995 15.1904 10.0916 9.8393 10.2032ZM9.89649 25.7005C6.87101 25.7005 4.39834 23.1144 4.40924 19.9839C4.39525 19.2507 4.52792 18.522 4.79947 17.8407C5.07102 17.1594 5.47597 16.5392 5.99056 16.0164C6.50515 15.4937 7.11902 15.0789 7.79613 14.7966C8.47324 14.5142 9.19995 14.3698 9.93362 14.372C10.6673 14.3742 11.3931 14.5228 12.0686 14.8092C12.744 15.0956 13.3554 15.514 13.8668 16.0398C14.3783 16.5656 14.7796 17.1882 15.0471 17.8711C15.3146 18.554 15.4429 19.2834 15.4246 20.0166C15.4409 23.1008 12.9111 25.7059 9.88832 25.7005H9.89649Z" fill="currentColor"></path>
          </svg>
        </div>
        </div>

        <div className='w-1/2 flex items-center justify-between'>
            <div>©Pixels 2026. Preserving Cultural Heritage.</div>
            <div>Built with passion for stories & songs.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;