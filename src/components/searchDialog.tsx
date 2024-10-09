import { Fragment } from 'react';
import { X, Search } from 'lucide-react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';

interface SearchDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    <div className="flex min-h-[50%] items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <button className="absolute top-4 right-4" onClick={onClose}>
                                    <X size={24} />
                                </button>
                                <DialogTitle as="h2" className="text-2xl font-semibold mb-4 font-title">
                                    Search Recipes
                                </DialogTitle>
                                <form className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Search for recipes, reviews, tools..."
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                                    />
                                    <button type="submit" className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-4">
                                        <Search size={20} /> Search
                                    </button>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
