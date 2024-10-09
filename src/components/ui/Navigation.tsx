'use client'

import React, { useState, useEffect, Fragment } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

import SearchDialog from '@/components/searchDialog';

import { navLinks } from "@/assets/data/common/navlinks";
import LogoWhite from '@/assets/logos/logo_light.svg';

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
                <section className="flex justify-between items-center border-y py-5">
                    <Link href="/">
                        <Image src={LogoWhite} alt="logo image" priority width={206} height={45} />
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        <ul className="list-unstyled p-0 flex items-center gap-2">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.link}
                                          className="py-2 px-5 border-r transit hover:text-primary capitalize">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            className="flex items-center gap-10 transit hover:text-primary"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Open search"
                        >
                            Search <Search size={20} />
                        </button>
                    </nav>

                    <div className="flex md:hidden items-center gap-4">
                        <button
                            type="button"
                            className="transit hover:text-primary"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Open search"
                        >
                            <Search size={20} />
                        </button>
                        <button
                            type="button"
                            className="transit hover:text-primary"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </section>
            </div>

            <Transition appear show={menuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setMenuOpen(false)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-end text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-x-full"
                                enterTo="opacity-100 translate-x-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-x-0"
                                leaveTo="opacity-0 translate-x-full"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                                    <div className="h-full flex flex-col p-6">
                                        <button
                                            className="self-end"
                                            onClick={() => setMenuOpen(false)}
                                            aria-label="Close menu"
                                        >
                                            <X size={24} />
                                        </button>
                                        <ul className="flex flex-col gap-4 text-lg mt-8">
                                            {navLinks.map((link, index) => (
                                                <li key={index} className="border-b w-full">
                                                    <Link href={link.link}
                                                          className="w-full py-4 flex justify-between items-center transit hover:text-primary capitalize"
                                                          onClick={() => setMenuOpen(false)}>
                                                        {link.title}
                                                        <ChevronRight size={20} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}