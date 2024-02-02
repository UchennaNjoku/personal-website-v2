import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="bg-white relative w-screen">
      <header className='bg-white w-full  absolute top-0 z-10 p-10'>
            <div className="flex w-full justify-between items-center m-auto max-w-8xl">
                <div className="flex-1"></div> {/* Invisible spacer */}
                <div className="flex flex-grow justify-center items-center space-x-10"> {/* Centered content without forcing width */}
                    <Link href="/experience" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>/experience</Link>
                    <Link href="/works" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>/works</Link>
                    <Link href="/contact" className='text-black no-underline border-b border-transparent transition-all hover:border-current'>/contact</Link>
                </div>
                <div className='flex-1 flex justify-end'> {/* Right-aligned content */}
                    <Link href="/" className='border-2 pointer hover:bg-gray-600 hover:text-white transition-all border-gray-800 rounded-md px-2 py-1 text-gray-800'>get my resume</Link>
                </div>
            </div>
      </header>
      <section className="z-0 flex flex-col m-auto justify-center h-screen max-w-5xl text-black -pt-[120px]">
        <div >

          <h1 className="text-8xl m-0">Hi,<span role="img" className='waveanim' aria-label="sheep">👋🏼</span> I'm <span className="line-through"><b>your next software developer,</b></span> <b>Uchenna Njoku</b></h1>
          <h3 className="text-2xl m-0">specializing in crafting <b>unique digital experiences. </b></h3>
        
        </div>
      </section>

      <section className="flex flex-col h-screen m-auto justify-center  max-w-5xl text-black">
        
        <div className="flex flex-row">
          <div className="flex flex-col space-y-5">
            <h2 className="text-5xl m-0">I'm a software engineer based in Daytona Beach, Florida</h2>
            <p className="text-2xl m-0">I have a knack for full-stack development, clean design patterns, human-computer interactions, and everything in between. I'm quietly confident, naturally curious, and perpetually improving my chops one problem at a time!</p>
            <p className="text-2xl font-medium m-0">previously worked at:</p>
            <ul className="text-2xl m-0">
              <li>🚀 <a href="https://www.amazon.com/" target="_blank">Amazon</a></li>
              <li>🔥 <a href="https://www.https://avtcseries.org/about-the-ecocar-ev-challenge/" target="_blank">General Motors EV Challenge</a></li>
            </ul>
          </div>  
        </div>
      </section>
    </main> 
  );
}
