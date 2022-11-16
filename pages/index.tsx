// next
import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

// image
import image from 'assets/image.png'
import Navigation from "../components/nav";
import Button from "../components/button";
import Footer from "../components/footer";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Next Ice And Fire</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="max-w-7xl mx-auto h-full min-h-screen">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32 h-full">
                    {/* navigation */}
                    <Navigation/>
                    {/* main */}
                    <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-full">
                        <div
                            className="flex flex-col md:flex-row w-full items-start justify-between md:justify-start h-full md:h-1/2">
                            <div
                                className="text-left z-20 md:z-30 w-full md:w-1/2 flex flex-col items-center md:items-start justify-start md:justify-center h-full">
                                <h1 className="tracking-tight font-extrabold text-gray-900 text-6xl "><span
                                    className="flex w-full m-auto text-indigo-600">Ice And Fire</span><span
                                    className="block font-bold xl:inline"><span
                                    className="absolute">Characters</span><br/>with all details</span>
                                </h1>
                                <h2 className="mt-3  text-gray-500 sm:mt-5 text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">All
                                    the data from the universe of Ice And Fire you've ever wanted!</h2>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start w-full">
                                    <Button type={"cta"}>Get started</Button>
                                    <Button type={"github"}>Github</Button>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <Image src={image} alt="image" className="w-[500px]"/>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Home
