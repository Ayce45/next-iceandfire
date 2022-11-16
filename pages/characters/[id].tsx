// next
import type {NextPage} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'

// react
import React, {useEffect, useState} from 'react';

// types
import character from '../../types/character'

// utils
import {extractIdFromUrl} from "../../utils/functions";
import {getCharacters} from "../../api/iceandfire";
import Character from "../../types/character";
import Navigation from "../../components/nav";
import Footer from "../../components/footer";

const Characters: NextPage = () => {
    // url params
    const router = useRouter()
    const {id} = router.query

    // state
    const [chars, setChars] = useState<Character | null>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [allegiances, setAllegiances] = useState<any[]>([]);

    // fetch books
    useEffect(() => {
        if (!id) return;
        getCharacters(id).then((res: character) => {
            // @ts-ignore
            setChars(res)
        })
    }, [id])

    // fetch books of character
    useEffect(() => {
        if (chars) {
            let result: any[] = []
            Promise.all(chars?.books.map((url: RequestInfo | URL) => fetch(url).then((r) => r.json()).then((data: any) => {
                result.push(data)
            }))).then(() => {
                setBooks(result)
            })
        }
    }, [chars])

    // fetch allegiances of character
    useEffect(() => {
        if (chars) {
            let result: any[] = []
            Promise.all(chars?.allegiances.map((url: RequestInfo | URL) => fetch(url).then((r) => r.json()).then((data: any) => {
                result.push(data)
            }))).then(() => {
                setAllegiances(result)
            })
        }
    }, [chars])

    console.log(chars)

    return (
        <>
            <Head>
                <title>Next Ice And Fire | Chars</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="max-w-7xl mx-auto min-h-screen">

                <Navigation />

                {/* main */}
                <main className="flex">
                    <div className="container mx-auto my-5 p-5">
                        <div className="md:flex no-wrap md:-mx-2 ">
                            <div className="w-full md:w-3/12 md:mx-2">
                                {/* names */}
                                <div className="bg-white p-3 border-t-4 border-indigo-400 gap-1 flex flex-col">
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{chars?.name ? chars?.name : "Unknown"}</h1>
                                    <h2 className="text-gray-600 font-lg font-semibold leading-6">{chars?.titles ? chars?.titles.join(', ') : 'No titles'}</h2>
                                    <h3 className="text-gray-600 font-lg leading-6">{chars?.aliases ? chars?.aliases.join(', ') : 'No aliase'}</h3>
                                    <p className="text-gray-400">{chars?.playedBy ? chars?.playedBy.join(', ') : 'No actor'}</p>
                                </div>
                                {/* allegiances */}
                                <div className="my-4">
                                    <ul
                                        className="bg-gray-100 text-gray-600 w py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        {allegiances?.length > 0 ? allegiances?.map((item, index) => (
                                            <li key={index} className="flex items-center py-3">
                                                <span>{item.name}</span>
                                            </li>
                                        )) : 'No allegiances'}
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full md:w-9/12 mx-2">
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <div
                                        className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <span className="text-indigo-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">About</span>
                                    </div>
                                    {/* details */}
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">First Name</div>
                                                <div className="px-4 py-2">{chars?.name.split(' ')[0] ? chars?.name.split(' ')[0] : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                                <div className="px-4 py-2">{chars?.name.split(' ')[1] ? chars?.name.split(' ')[1] : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Gender</div>
                                                <div className="px-4 py-2">{chars?.gender ? chars?.gender : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Culture</div>
                                                <div className="px-4 py-2">{chars?.culture ? chars?.culture : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Born</div>
                                                <div className="px-4 py-2">{chars?.born ? chars?.born : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Died</div>
                                                <div className="px-4 py-2">{chars?.died ? chars?.died : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Father</div>
                                                <div className="px-4 py-2">{chars?.father ? chars?.father : 'Unknown'}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Mother</div>
                                                <div className="px-4 py-2">{chars?.mother ? chars?.mother : 'Unknown'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* appearance */}
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <div className="grid grid-cols-2">
                                        {/* tv series */}
                                        <div>
                                            <div
                                                className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                <span className="text-indigo-500">
                                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                    </svg>
                                                </span>
                                                <span className="tracking-wide">TV Series</span>
                                            </div>
                                            <ul className="list-inside space-y-2">
                                                {chars && chars?.tvSeries.length > 0 && chars?.tvSeries[0] !== '' ? chars?.tvSeries.map((item, index) => (
                                                    <li key={index}>
                                                        {item}
                                                    </li>
                                                )) : 'No TV Series'}
                                            </ul>
                                        </div>
                                        {/* books */}
                                        <div>
                                            <div
                                                className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                <span className="text-indigo-500">
                                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                                        <path fill="#fff"
                                                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                                        <path
                                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                                                    </svg>
                                                </span>
                                                <span className="tracking-wide">Books</span>
                                            </div>
                                            <ul className="list-inside space-y-2">
                                                {books?.map((book, index) => (
                                                    <li key={index}>
                                                        <div className="text-indigo-600"><a
                                                            href={"/books/" + extractIdFromUrl(book.url)}>{book.name}</a>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    )
}

export default Characters
