"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import Footer from "./components/Footer";
import GMLogo from "./gm.png";
import Munchies_Tablet from "./Munchies_Tablet.png";
import ThrivMockup from "./ThrivMockup.png";
import  Sentinel_Desktop from "./Sentinel_Desktop.png";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import StickyCursor from "@/components/StickyCursor";
import { Input } from "@/components/ui/input"





export default function Home() {

  const experienceRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a ref with explicit typing
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
    <StickyCursor />
    <main className="bg relative w-screen">
      <header className=' w-full  absolute top-0 p-10'>
            <div className="flex w-full justify-between items-center m-auto max-w-8xl">
                <div className="flex-1"></div> 
                <div className="flex flex-grow justify-center items-center space-x-10"> 
                    <button data-sticky onClick={() => scrollToRef(experienceRef)} className='text-black font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current'>/experience</button>
                    <button data-sticky onClick={() => scrollToRef(worksRef)} className='text-black font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current'>/works</button>
                    <button data-sticky onClick={() => scrollToRef(contactRef)} className='data-sticky font-normal hover:font-medium text-black no-underline border-b border-transparent transition-all hover:border-current'>/contact</button>
                </div>
                <div  className='flex-1 flex justify-end '> 
                <Link data-sticky href={"/resume.pdf"} locale={false} target="_blank" rel="noopener noreferrer" className='h-fit w-fit border-2 pointer hover:bg-gray-700 hover:text-white transition-all border-gray-800 rounded-md px-2 py-1 text-gray-800'>get my resume</Link>
                </div>
            </div>
      </header>
      <section className="flex flex-col m-auto justify-center h-screen max-w-5xl text-black -pt-[120px]">
        <div >

          <h1 className="text-8xl m-0">Hi,<span role="img" className='waveanim' aria-label="sheep">👋🏼</span> I&apos;m <span className="line-through"><b>your next software developer,</b></span> <b>Uchenna Njoku</b></h1>
          <h3 className="text-2xl m-0">specializing in crafting <b>unique digital experiences. </b></h3>
        
        </div>
      </section>

      <section className="flex flex-col h-screen m-auto justify-center  max-w-5xl text-black">
        
        <div  ref={experienceRef} className="flex flex-row">
          <div className="flex flex-col space-y-5">
            <h2 className="text-5xl m-0">I&apos;m a software engineer based in Daytona Beach, Florida</h2>
            <p className="text-2xl m-0">I have a knack for full-stack development, clean design patterns, human-computer interactions, and everything in between. I&apos;m quietly confident, naturally curious, and perpetually improving my chops one problem at a time!</p>
            <p className="text-2xl font-medium m-0">previously worked at:</p>
            <ul className="text-2xl m-0">

              <li>    
                <Drawer>
                  <DrawerTrigger>
                    <div className="flex flex-col ml-2 w-fit h-fit">
                      <div className="flex flex-row items-center w-fit h-fit">
                        <svg width="56px" height="56px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Amazon-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-601.000000, -560.000000)"> <g id="Amazon" transform="translate(601.000000, 560.000000)"> <path d="M25.4026553,25.9595294 C24.660417,27.4418824 23.3876054,28.3962353 22.0103725,28.7181176 C21.8015298,28.7181176 21.4826213,28.8225882 21.1637129,28.8225882 C18.835399,28.8225882 17.458166,27.0211765 17.458166,24.3727059 C17.458166,20.9788235 19.4703937,19.392 22.0103725,18.6465882 C23.3876054,18.3303529 24.9793255,18.2230588 26.5682233,18.2230588 L26.5682233,19.4964706 C26.5682233,21.9331765 26.6726447,23.8390588 25.4026553,25.9595294 L25.4026553,25.9595294 Z M26.5682233,13.3524706 C25.1909904,13.4569412 23.5992703,13.5614118 22.0103725,13.7703529 C19.574815,14.0922353 17.1392576,14.5157647 15.1298521,15.4701176 C11.2098182,17.0597647 8.55977364,20.4508235 8.55977364,25.4287059 C8.55977364,31.6856471 12.5842289,34.8621176 17.6726531,34.8621176 C19.3659723,34.8621176 20.7432053,34.6475294 22.0103725,34.3341176 C24.0282445,33.696 25.7187415,32.5298824 27.7309692,30.4094118 C28.8965372,31.9990588 29.2182679,32.7444706 31.2276733,34.4385882 C31.7582467,34.6475294 32.28882,34.6475294 32.7093276,34.3341176 C33.9821392,33.2724706 36.208854,31.3637647 37.3715998,30.3049412 C37.9021732,29.8814118 37.7977518,29.2432941 37.4760212,28.7181176 C36.3132753,27.2329412 35.1448851,25.9595294 35.1448851,23.0992941 L35.1448851,13.5614118 C35.1448851,9.53505882 35.4666157,5.82494118 32.5004849,3.072 C30.0649275,0.849882353 26.2493149,0 23.2831841,0 L22.0103725,0 C16.6115064,0.313411765 10.8937319,2.64564706 9.61809814,9.32329412 C9.40643324,10.1731765 10.0442501,10.4894118 10.4675799,10.5938824 L16.3998415,11.3364706 C17.0348362,11.2291765 17.3537447,10.6983529 17.458166,10.1731765 C17.9859172,7.84094118 19.8937235,6.67482353 22.0103725,6.46023529 L22.4365245,6.46023529 C23.7093361,6.46023529 25.086569,6.99105882 25.8259851,8.05270588 C26.6726447,9.32329412 26.5682233,11.0202353 26.5682233,12.5054118 L26.5682233,13.3524706 L26.5682233,13.3524706 Z" fill="#343B45"> </path> <path d="M47.9943556,35.9463529 L47.9943556,35.9435294 C47.971778,35.4437647 47.8673567,35.0625882 47.658514,34.7463529 L47.6359364,34.7152941 L47.6105366,34.6842353 C47.3988717,34.4527059 47.1956734,34.3651765 46.9755419,34.2691765 C46.3179696,34.0150588 45.3612442,33.8795294 44.2097872,33.8767059 C43.382883,33.8767059 42.4713128,33.9557647 41.5540982,34.1562353 L41.551276,34.0941176 L40.6284171,34.4018824 L40.6114839,34.4103529 L40.0893771,34.5797647 L40.0893771,34.6023529 C39.47696,34.8564706 38.9209869,35.1727059 38.4045245,35.5482353 C38.0827939,35.7882353 37.8175072,36.1072941 37.8033962,36.5957647 C37.7949296,36.8611765 37.9303952,37.1661176 38.1533489,37.3468235 C38.3763025,37.5275294 38.6359448,37.5896471 38.8645429,37.5896471 C38.9181647,37.5896471 38.9689643,37.5868235 39.0141194,37.5783529 L39.0592746,37.5755294 L39.093141,37.5698824 C39.5446928,37.4738824 40.2022651,37.4089412 40.9727253,37.3016471 C41.6331198,37.2282353 42.3330251,37.1745882 42.9397978,37.1745882 C43.368772,37.1717647 43.7554132,37.2028235 44.0206999,37.2592941 C44.1533432,37.2875294 44.2521202,37.3214118 44.3057419,37.3496471 C44.3254973,37.3552941 44.3396083,37.3637647 44.3480749,37.3694118 C44.3593637,37.4061176 44.3762969,37.5021176 44.3734747,37.6348235 C44.3791191,38.1430588 44.164632,39.0861176 43.8683012,40.0065882 C43.5804369,40.9270588 43.2304843,41.8503529 42.999064,42.4630588 C42.94262,42.6042353 42.9059314,42.7595294 42.9059314,42.9289412 C42.900287,43.1745882 43.0018862,43.4738824 43.2163733,43.6715294 C43.425216,43.8691765 43.696147,43.9482353 43.9219229,43.9482353 L43.9332117,43.9482353 C44.2718756,43.9454118 44.5597398,43.8098824 44.8080933,43.6150588 C47.1505182,41.5087059 47.9661336,38.1430588 48,36.2484706 L47.9943556,35.9463529 Z M41.0489247,38.8658824 C40.8090378,38.8630588 40.5635065,38.9195294 40.3349084,39.0268235 C40.0780883,39.1284706 39.8156239,39.2470588 39.5672704,39.3515294 L39.2032068,39.504 L38.7290774,39.6931765 L38.7290774,39.6988235 C33.5785648,41.7882353 28.16841,43.0136471 23.1618295,43.1209412 C22.9783866,43.1265882 22.7921215,43.1265882 22.614323,43.1265882 C14.7403887,43.1322353 8.31706456,39.4785882 1.83729642,35.8785882 C1.61152053,35.76 1.37727804,35.6978824 1.15150215,35.6978824 C0.860815683,35.6978824 0.561662624,35.808 0.344353327,36.0112941 C0.12704403,36.2174118 -0.00277710907,36.5138824 4.50895989e-05,36.816 C-0.00277710907,37.2084706 0.208887791,37.5698824 0.505218651,37.8042353 C6.58705678,43.0870588 13.25309,47.9943529 22.2192152,48 C22.3941915,48 22.57199,47.9943529 22.7497885,47.9915294 C28.453452,47.8644706 34.902176,45.936 39.9087564,42.7905882 L39.9398006,42.7708235 C40.5945507,42.3783529 41.2493008,41.9322353 41.8673623,41.4381176 C42.2511813,41.1529412 42.516468,40.7068235 42.516468,40.2437647 C42.4995348,39.4221176 41.8024517,38.8658824 41.0489247,38.8658824 Z" id="Fill-237" fill="#FF9A00"> </path> </g> </g> </g> </g></svg>
                        <div className="flex flex-col ml-6 w-fit h-fit">
                          <h1 className="text-3xl">Amazon (AWS)</h1>
                          <div data-sticky className="flex flex-row items-center w-fit h-fit text-black">
                            <svg width="36px" height="36px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>
                            <p className="text-lg">see more!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                      <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">
                        <svg width="50px" height="50px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Amazon-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-601.000000, -560.000000)"> <g id="Amazon" transform="translate(601.000000, 560.000000)"> <path d="M25.4026553,25.9595294 C24.660417,27.4418824 23.3876054,28.3962353 22.0103725,28.7181176 C21.8015298,28.7181176 21.4826213,28.8225882 21.1637129,28.8225882 C18.835399,28.8225882 17.458166,27.0211765 17.458166,24.3727059 C17.458166,20.9788235 19.4703937,19.392 22.0103725,18.6465882 C23.3876054,18.3303529 24.9793255,18.2230588 26.5682233,18.2230588 L26.5682233,19.4964706 C26.5682233,21.9331765 26.6726447,23.8390588 25.4026553,25.9595294 L25.4026553,25.9595294 Z M26.5682233,13.3524706 C25.1909904,13.4569412 23.5992703,13.5614118 22.0103725,13.7703529 C19.574815,14.0922353 17.1392576,14.5157647 15.1298521,15.4701176 C11.2098182,17.0597647 8.55977364,20.4508235 8.55977364,25.4287059 C8.55977364,31.6856471 12.5842289,34.8621176 17.6726531,34.8621176 C19.3659723,34.8621176 20.7432053,34.6475294 22.0103725,34.3341176 C24.0282445,33.696 25.7187415,32.5298824 27.7309692,30.4094118 C28.8965372,31.9990588 29.2182679,32.7444706 31.2276733,34.4385882 C31.7582467,34.6475294 32.28882,34.6475294 32.7093276,34.3341176 C33.9821392,33.2724706 36.208854,31.3637647 37.3715998,30.3049412 C37.9021732,29.8814118 37.7977518,29.2432941 37.4760212,28.7181176 C36.3132753,27.2329412 35.1448851,25.9595294 35.1448851,23.0992941 L35.1448851,13.5614118 C35.1448851,9.53505882 35.4666157,5.82494118 32.5004849,3.072 C30.0649275,0.849882353 26.2493149,0 23.2831841,0 L22.0103725,0 C16.6115064,0.313411765 10.8937319,2.64564706 9.61809814,9.32329412 C9.40643324,10.1731765 10.0442501,10.4894118 10.4675799,10.5938824 L16.3998415,11.3364706 C17.0348362,11.2291765 17.3537447,10.6983529 17.458166,10.1731765 C17.9859172,7.84094118 19.8937235,6.67482353 22.0103725,6.46023529 L22.4365245,6.46023529 C23.7093361,6.46023529 25.086569,6.99105882 25.8259851,8.05270588 C26.6726447,9.32329412 26.5682233,11.0202353 26.5682233,12.5054118 L26.5682233,13.3524706 L26.5682233,13.3524706 Z" fill="#343B45"> </path> <path d="M47.9943556,35.9463529 L47.9943556,35.9435294 C47.971778,35.4437647 47.8673567,35.0625882 47.658514,34.7463529 L47.6359364,34.7152941 L47.6105366,34.6842353 C47.3988717,34.4527059 47.1956734,34.3651765 46.9755419,34.2691765 C46.3179696,34.0150588 45.3612442,33.8795294 44.2097872,33.8767059 C43.382883,33.8767059 42.4713128,33.9557647 41.5540982,34.1562353 L41.551276,34.0941176 L40.6284171,34.4018824 L40.6114839,34.4103529 L40.0893771,34.5797647 L40.0893771,34.6023529 C39.47696,34.8564706 38.9209869,35.1727059 38.4045245,35.5482353 C38.0827939,35.7882353 37.8175072,36.1072941 37.8033962,36.5957647 C37.7949296,36.8611765 37.9303952,37.1661176 38.1533489,37.3468235 C38.3763025,37.5275294 38.6359448,37.5896471 38.8645429,37.5896471 C38.9181647,37.5896471 38.9689643,37.5868235 39.0141194,37.5783529 L39.0592746,37.5755294 L39.093141,37.5698824 C39.5446928,37.4738824 40.2022651,37.4089412 40.9727253,37.3016471 C41.6331198,37.2282353 42.3330251,37.1745882 42.9397978,37.1745882 C43.368772,37.1717647 43.7554132,37.2028235 44.0206999,37.2592941 C44.1533432,37.2875294 44.2521202,37.3214118 44.3057419,37.3496471 C44.3254973,37.3552941 44.3396083,37.3637647 44.3480749,37.3694118 C44.3593637,37.4061176 44.3762969,37.5021176 44.3734747,37.6348235 C44.3791191,38.1430588 44.164632,39.0861176 43.8683012,40.0065882 C43.5804369,40.9270588 43.2304843,41.8503529 42.999064,42.4630588 C42.94262,42.6042353 42.9059314,42.7595294 42.9059314,42.9289412 C42.900287,43.1745882 43.0018862,43.4738824 43.2163733,43.6715294 C43.425216,43.8691765 43.696147,43.9482353 43.9219229,43.9482353 L43.9332117,43.9482353 C44.2718756,43.9454118 44.5597398,43.8098824 44.8080933,43.6150588 C47.1505182,41.5087059 47.9661336,38.1430588 48,36.2484706 L47.9943556,35.9463529 Z M41.0489247,38.8658824 C40.8090378,38.8630588 40.5635065,38.9195294 40.3349084,39.0268235 C40.0780883,39.1284706 39.8156239,39.2470588 39.5672704,39.3515294 L39.2032068,39.504 L38.7290774,39.6931765 L38.7290774,39.6988235 C33.5785648,41.7882353 28.16841,43.0136471 23.1618295,43.1209412 C22.9783866,43.1265882 22.7921215,43.1265882 22.614323,43.1265882 C14.7403887,43.1322353 8.31706456,39.4785882 1.83729642,35.8785882 C1.61152053,35.76 1.37727804,35.6978824 1.15150215,35.6978824 C0.860815683,35.6978824 0.561662624,35.808 0.344353327,36.0112941 C0.12704403,36.2174118 -0.00277710907,36.5138824 4.50895989e-05,36.816 C-0.00277710907,37.2084706 0.208887791,37.5698824 0.505218651,37.8042353 C6.58705678,43.0870588 13.25309,47.9943529 22.2192152,48 C22.3941915,48 22.57199,47.9943529 22.7497885,47.9915294 C28.453452,47.8644706 34.902176,45.936 39.9087564,42.7905882 L39.9398006,42.7708235 C40.5945507,42.3783529 41.2493008,41.9322353 41.8673623,41.4381176 C42.2511813,41.1529412 42.516468,40.7068235 42.516468,40.2437647 C42.4995348,39.4221176 41.8024517,38.8658824 41.0489247,38.8658824 Z" id="Fill-237" fill="#FF9A00"> </path> </g> </g> </g> </g></svg>
                        <h1 className="text-3xl">
                          Amazon
                        </h1>
                      </div>
                      </DrawerTitle>
                      <DrawerDescription>
                        <div className="flex flex-col items-center p-5">

                          <h2 className="text-2xl font-semibold">
                            Software Engineer Intern
                          </h2>
                          <div className="text-lg px-16">
                          Architected the migration process of the internal AWS Network host generation workflow with automated pipelines, leveraging AWS Services such as CloudFormation, CloudWatch, AWS Lambda, and Cloud Development Kit, increasing site build speed by 40%
                          Increased robustness of 450+ AWS Network Centres which run over 1 million external services, resulting in increased reliability and manageability, implementing these changes using Typescript, Java, and Python
                          Assisted in network host initialization and maintenance processes, implementing status checkers to allow for ease of tracking in a user friendly interface to monitor metrics
                          </div>
                        </div>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose>
                        <Button variant="outline">Close Window</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </li>
              <li className="mt-5">    
                <Drawer>
                  <DrawerTrigger>
                    <div className="flex flex-col ml-2 w-fit h-fit">
                      <div className="flex flex-row items-center w-fit h-fit">
                        <Image src={GMLogo} alt="GM" width={56} height={56} />
                        <div className="flex flex-col ml-6 w-fit h-fit">
                          <h1 className="text-3xl">General Motors EV Challenge</h1>
                          <div data-sticky className="flex flex-row items-center w-fit h-fit text-black">
                            <svg width="36px" height="36px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>
                            <p className="text-lg">see more!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                      <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">
                        <Image src={GMLogo} alt="GM" width={56} height={56} />
                        <h1 className="text-3xl">
                          General Motors EcoCAR EV Challenge
                        </h1>
                      </div>
                      </DrawerTitle>
                      <DrawerDescription>
                        <div className="flex flex-col items-center p-5">

                          <h2 className="text-2xl font-semibold">
                          Software Engineer (Connected and Autonomous Vehicles (CAVS))
                          </h2>
                          <div className="text-lg px-16">
                          Engineered advanced vehicle control algorithms using MathWorks MATLAB and Simulink, enhancing vehicle performance and energy efficiency, utilising dSPACE for simulations in order to validate strategy implementations.
<br/>Refined vast datasets from onboard sensors, applying Fourier and Wavelet transforms for noise reduction, leveraging Principal Component Analysis and t-distributed stochastic neighbour embedding (t-SNE) for data parsing with machine learning predictive models to glean insights into vehicle health and energy consumption.
<br/>Implementing efficiency-oriented solutions and innovations to address the challenges inherent in electric vehicles over the four-year EcoCar EV competition as part of the Connected and Autonomous Vehicles (CAVS) subteam.
                          </div>
                        </div>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose>
                        <Button variant="outline">Close Window</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </li>
            </ul>
          </div>  
        </div>
      </section>

      <section  ref={worksRef} className="py-16 flex flex-col m-auto justify-center mb-48 text-black">
        <div className="w-full max-w-5xl m-auto">
          <h1 className="text-5xl">...some stuff I&apos;ve worked on 👨🏽‍💻</h1>
        </div>
       
        <div className="flex flex-row max-w-5xl m-auto justify-between">
          <div className="mt-16">
            <Image src={ThrivMockup} className="" width={1000} alt="Munchies"/>
          </div>
          <div className="mt-32 w-full flex flex-col items-end">
            <h1 className="text-gray-300 font-black text-7xl">01</h1>
            <h1 className="text-5xl font-medium text-gray-600">Thriv</h1>
            <p className="text-xl text-gray-400 font-regular w-4/5">your personal fitness companion designed to help you dial in your fitness goals.</p>
            <p className="text-xl text-gray-400 font-regular w-4/5">in development using React Native and Firebase<br/></p>
            <div className="flex flex-row justify-start w-4/5">
            <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
              <Link href={"https://thriv-app.vercel.app/"}> View Project</Link>
              </Button>
            <Button data-sticky variant="outline" className="mt-5 ml-3 h-fit w-fit">
              <Link href={"https://github.com/UchennaNjoku/Thriv"}>See Github</Link>
            </Button>
            </div>
          </div>
        </div>


        <div className="flex flex-row max-w-5xl m-auto justify-between">
          <div className="mt-32 w-full py-14">
            <h1 className="text-gray-300 font-black text-7xl">02</h1>
            <h1 className="text-5xl font-medium text-gray-600">Munchies Recipes</h1>
            <p className="text-xl text-gray-400 font-regular w-4/5">A recipe web application that helps you find the perfect recipe for any meal</p>
            <p className="text-xl text-gray-400 font-regular w-4/5">- Developed using React and TailwindCSS<br/>- Leveraging the Spoonacular API to get results</p>
            <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
              <Link href={"https://munchies-recipes.vercel.app/"}> View Project</Link>
              </Button>
            <Button data-sticky variant="outline" className="h-fit w-fit mt-5 ml-3">
              <Link href={"https://github.com/UchennaNjoku/munchies-recipes"}>See Github</Link>
            </Button>
          </div>
          <div className="mt-16">
            <Image src={Munchies_Tablet} className="" width={1000} alt="Munchies"/>
          </div>
        </div>
        
        <div className="flex flex-row max-w-5xl m-auto justify-between">
          <div className="mt-16">
            <Image src={Sentinel_Desktop} className="" width={900} alt="Munchies"/>
          </div>
          <div className="mt-32 w-full flex flex-col items-end">
          <h1 className="text-gray-300 font-black text-7xl">03</h1>
            <h1 className="text-5xl font-medium text-gray-600">Sentinel Staffing</h1>
            <p className="text-xl text-gray-400 font-regular w-4/5 mt-3">Redesigned the web application portal for Sentinel Staffing Solutions. Developed using React and TailwindCSS</p>
            <div className="flex flex-row justify-start w-4/5">
            <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
              <Link href={"https://sentinel-staffing.vercel.app/"}> View Project</Link>
              </Button>
            <Button data-sticky variant="outline" className="h-fit w-fit mt-5 ml-3">
              <Link href={"https://github.com/UchennaNjoku/sentinel-staffing"}>See Github</Link>
            </Button>
            </div>
          </div>
        </div>
        

        
        

      </section>

      
      <footer ref={contactRef} className="bg-gray-950 rounded-t-3xl text-gray-50 pt-36">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold sm:text-6xl md:text-7xl">Get in touch! <span className="contact-anim">📬</span></h2>
          <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-700">
            I am always eager for new opportunities and collaborations. Feel free to reach out to me via the following platforms.
          </p>
        </div>
        
        <div className="flex w-screen justify-center gap-12 mt-24 mb-6">
          <Link data-sticky className="text-gray-300 h-fit w-fit hover:text-gray-100" href="https://www.linkedin.com/in/uchennanjoku/">
            LinkedIn
          </Link>
          <Link data-sticky className="text-gray-300 h-fit w-fit hover:text-gray-100" href="https://github.com/UchennaNjoku">
            GitHub
          </Link>
          <Link data-sticky className="text-gray-300 h-fit w-fit hover:text-gray-100" href="mailto:uchenna.c.njoku@gmail.com">
            Gmail
          </Link>
          <Link data-sticky className="text-gray-300 h-fit w-fit hover:text-gray-100" href="#">
            +1 (559) 776-2242
          </Link>
        </div>
      </div>
      <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Uchenna Njoku. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>

    </main> 
    </>
  );
}
