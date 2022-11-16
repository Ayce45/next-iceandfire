// next
import type {NextPage} from 'next'
import Head from 'next/head'
import Link from "next/link";
import {useRouter} from 'next/router'

// react
import React, {useEffect, useState} from 'react';

// types
import book from '../../types/book'
import character from '../../types/character'

// utils
import {extractIdFromUrl} from "../../utils/functions";
import {getBooks} from "../../api/iceandfire";

const Book: NextPage = () => {
    // url params
    const router = useRouter()
    const {id} = router.query

    // state
    const [books, setBooks] = useState<any[]>([]);
    const [chars, setChars] = useState<any[]>([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [booksNumber] = useState(5)

    // current book
    const book = books.find((book: book) => extractIdFromUrl(book.url) === id)

    // current book characters with pagination
    const paginatedPosts = book?.characters.slice((pageNumber - 1) * booksNumber, pageNumber * booksNumber)

    // actions
    const handlePrev = (e: any) => {
        e.preventDefault()
        if (pageNumber === 1) return
        setPageNumber(pageNumber - 1)
    }
    const handleNext = (e: any) => {
        e.preventDefault()
        if (pageNumber === Math.round(book?.characters.length / booksNumber) + 1) return
        setPageNumber(pageNumber + 1)
    }

    // create paginated characters and fetch data
    useEffect(() => {
        if (paginatedPosts) {
            let result: any[] = []
            Promise.all(paginatedPosts.map((url: RequestInfo | URL) => fetch(url).then((r) => r.json()).then((data: any) => {
                result.push(data)
            }))).then(() => {
                setChars(result)
            })
        }
    }, [books, pageNumber])

    // fetch books
    useEffect(() => {
        getBooks()
            .then(items => {
                setBooks(items)
            })
    }, [])

    return (
        <>
            <Head>
                <title>Next Ice And Fire | Books</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {/* header */}
            <div className="max-w-7xl mx-auto h-full">
                <nav className="relative z-10 bg-white lg:w-full h-full">
                    <div className="relative bg-white z-40">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className=" flex justify-between items-center  border-gray-100 py-6  md:space-x-10">
                                <div className="flex justify-start items-center gap-12"><Link
                                    className="flex items-center"
                                    href='/'><span
                                    className="ml-2 text-2xl font-bold">Next <span className="text-indigo-600">Ice And Fire</span></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <aside className="relative bg-white w-72 h-full">
                            <div className="flex flex-col sm:flex-row sm:justify-around">
                                <div className="w-72 h-full">
                                    <nav className="mt-10 px-6">
                                        {books.map((book: book, key) => (
                                            <a key={key}
                                               className={extractIdFromUrl(book.url) === id ? "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200 text-gray-800 rounded-lg bg-gray-100" : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200  text-gray-600"}
                                               href={"/books/" + extractIdFromUrl(book.url)}>
                                                <span className="mx-4 text-lg font-normal">{book.name}</span>
                                                <span className="flex-grow text-right">
                                            <button type="button"
                                                    className="w-9 h-9 text-xs rounded-full text-white bg-indigo-500">
                                                <span className="p-1">
                                                    {book.characters.length}
                                                </span>
                                            </button>
                                     </span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>
                        <div className="container mx-auto px-4 sm:px-8 max-w-3xl h-screen">
                            <div className="py-8">
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Id
                                                </th>
                                                <th scope="col"
                                                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Name
                                                </th>
                                                <th scope="col"
                                                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Gender
                                                </th>
                                                <th scope="col"
                                                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Born
                                                </th>
                                                <th scope="col"
                                                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Died
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="h-[500px]">
                                            {chars.length > 0 ? chars?.map((character: character, key: number) => (
                                                <tr key={key} className="cursor-pointer hover:text-gray-800 hover:bg-gray-100 text-gray-900 relative">
                                                    <th scope="row"><a href={"/characters/" + extractIdFromUrl(character.url)} className="after:absolute after:inset-0">{ extractIdFromUrl(character.url)}</a></th>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                            <div className="flex items-center">
                                                                <div className="ml-3">
                                                                    <p className="whitespace-no-wrap">
                                                                        {character.name ? character.name : "Unknown"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <p className="whitespace-no-wrap">
                                                            {character.gender ? character.gender : "Unknown"}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <p className="whitespace-no-wrap">
                                                            {character.born ? character.born : "Unknown"}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <p className="whitespace-no-wrap">
                                                            {character.died ? character.died : "Unknown"}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )) : <tr>
                                                    <td colSpan={4} className="text-center">No characters found</td>
                                                </tr>}
                                            </tbody>
                                        </table>
                                        {chars.length > 0 && (
                                            <div
                                                className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                                                <div className="flex items-center">
                                                    <button type="button" onClick={handlePrev}
                                                            className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                                        <svg width="9" fill="currentColor" height="8" className=""
                                                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                    <button type="button" onClick={handleNext}
                                                            className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                                        <svg width="9" fill="currentColor" height="8" className=""
                                                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <footer className="flex h-24 w-full items-center justify-center border-t">
                <a
                    className="flex items-center justify-center gap-2"
                    href="https://evanjuge.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Evan JUGE
                </a>
            </footer>
        </>
    )
}

export default Book
