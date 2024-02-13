import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className='bg-white max-w-full'>
            <div className="flex w-screen justify-between items-center m-auto max-w-8xl p-10">
                <div className="flex-1"></div> {/* Invisible spacer */}
                <div className="flex flex-grow justify-center items-center space-x-10"> {/* Centered content without forcing width */}
                    <Link href="/experience" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>experience</Link>
                    <Link href="/works" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>works</Link>
                    <Link href="/contact" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>contact</Link>
                </div>
                <div className='flex-1 flex justify-end'> {/* Right-aligned content */}
                    <Link href={"public/resume.pdf"} locale={false} target="_blank" rel="noopener noreferrer" className='border-2 pointer hover:bg-gray-600 hover:text-white transition-all border-gray-800 rounded-md px-2 py-1 text-gray-800'>get my resume</Link>
                </div>
            </div>
        </header>
    
    );
};

export default Header;
