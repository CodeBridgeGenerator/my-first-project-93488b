import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const CommandMenu = () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [visible6, setVisible6] = useState(false);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('Search raised tickets, HnC, CnB COMBO and more...');
    const [value6, setValue6] = useState('Sign');

    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);
    const input5 = useRef(null);
    const input6 = useRef(null);

    return (
        <>
            <section className="w-30rem bg-black-alpha-50 border-round-lg" style={{ backdropFilter: 'blur(70px)' }}>
                <div className="flex w-full align-items-center justify-content-between px-1">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search text-white-alpha-80"></i>
                        <InputText
                            type="text"
                            value={value5}
                            className="w-full border-none bg-transparent shadow-none outline-none text-white-alpha-80 text-sm"
                            onClick={() => {
                                setVisible5(true);
                                setValue5('');
                            }}
                        />
                    </span>
                    <span className="p-1 border-white-alpha-20 border-1 border-round mr-2 text-white-alpha-80 text-xs bg-white-alpha-2s hidden md:block">⌘K</span>
                </div>
            </section>
            <Dialog
                visible={visible5}
                onHide={() => {
                    setVisible5(false);
                    setValue5('Search raised tickets, HnC, CnB COMBO and more...');
                }}
                onShow={() => input5.current.focus()}
                modal
                dismissableMask
                showHeader={false}
                className="border-none bg-black-alpha-50"
                contentClassName="border-black-alpha-20 border-round p-0 bg-transparent"
                breakpoints={{ '960px': '75vw', '640px': '100vw' }}
                style={{ width: '750px', backdropFilter: 'blur(70px)' }}
            >
                <div className="flex w-full align-items-center justify-content-between px-1">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search text-white-alpha-80"></i>
                        <InputText type="text" ref={input5} value={value5} onChange={(e) => setValue5(e.target.value)} className="w-full border-none bg-transparent shadow-none outline-none text-white-alpha-80 text-sm" />
                    </span>
                    <span className="p-1 border-white-alpha-20 border-1 border-round mr-2 text-white-alpha-80 text-xs bg-white-alpha-2s hidden md:block">⌘K</span>
                </div>
                <div className="border-y-2 border-white-alpha-20 p-3">
                    <h2 className="font-semibold text-xs text-white-alpha-50 mb-2 mt-0 px-1">RECENT</h2>
                    <ul className="list-none m-0 p-0">
                        <li className="select-none p-2 text-white-alpha-80 font-normal text-base cursor-pointer border-round-lg hover:bg-white-alpha-20 hover:text-white">rasied tickets</li>
                        <li className="select-none p-2 text-white-alpha-80 font-normal text-base cursor-pointer border-round-lg hover:bg-white-alpha-20 hover:text-white">operations</li>
                        <li className="select-none p-2 text-white-alpha-80 font-normal text-base cursor-pointer border-round-lg hover:bg-white-alpha-20 hover:text-white">dashboards</li>
                        <li className="select-none p-2 text-white-alpha-80 font-normal text-base cursor-pointer border-round-lg hover:bg-white-alpha-20 hover:text-white">users</li>
                    </ul>
                </div>
                <div className="p-3">
                    <article className="flex flex-column sm:flex-row w-full sm:justify-content-between sm:align-items-center mb-3 select-none cursor-pointer border-round-lg px-2 py-1 text-white-alpha-80 hover:bg-white-alpha-20 hover:text-white">
                        <div className="flex align-items-center">
                            <span className="border-circle flex-shrink-0 w-2rem h-2rem flex align-items-center justify-content-center bg-white-alpha-20">
                                <i className="pi pi-star text-lg"></i>
                            </span>
                            <div className="ml-2">
                                <p className="font-semibold text-sm mt-0 mb-1">Recent Tickets</p>
                                <p className="font-normal text-xs text-white-alpha-80 mt-0 mb-0">Reach your recent tickets</p>
                            </div>
                        </div>
                        <div className="hidden md:flex align-items-center md:align-self-center mt-3 sm:mt-0">
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">⌘</span>
                            <span className="mx-2 text-white-alpha-80">+</span>
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">F</span>
                        </div>
                    </article>
                    <article className="flex flex-column sm:flex-row w-full sm:justify-content-between sm:align-items-center mb-3 select-none cursor-pointer border-round-lg px-2 py-1 text-white-alpha-80 hover:bg-white-alpha-20 hover:text-white">
                        <div className="flex align-items-center">
                            <span className="border-circle flex-shrink-0 w-2rem h-2rem flex align-items-center justify-content-center bg-white-alpha-20">
                                <i className="pi pi-github text-lg"></i>
                            </span>
                            <div className="ml-2">
                                <p className="font-semibold text-sm mt-0 mb-1">Operations</p>
                                <p className="font-normal text-xs text-white-alpha-80 mt-0 mb-0">Get list and manage your assigned jobs</p>
                            </div>
                        </div>
                        <div className="hidden md:flex align-items-center md:align-self-center mt-3 sm:mt-0">
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">⌘</span>
                            <span className="mx-2 text-white-alpha-80">+</span>
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">SHIFT</span>
                            <span className="mx-2 text-white-alpha-80">+</span>
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">R</span>
                        </div>
                    </article>
                    <article className="flex flex-column sm:flex-row w-full sm:justify-content-between sm:align-items-center mb-3 select-none cursor-pointer border-round-lg px-2 py-1 text-white-alpha-80 hover:bg-white-alpha-20 hover:text-white">
                        <div className="flex align-items-center">
                            <span className="border-circle flex-shrink-0 w-2rem h-2rem flex align-items-center justify-content-center bg-white-alpha-20">
                                <i className="pi pi-bolt text-lg"></i>
                            </span>
                            <div className="ml-2">
                                <p className="font-semibold text-sm mt-0 mb-1">Uprade your plan now</p>
                                <p className="font-normal text-xs text-white-alpha-80 mt-0 mb-0">Access all premium benefits</p>
                            </div>
                        </div>
                        <div className="hidden md:flex align-items-center md:align-self-center mt-3 sm:mt-0">
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">⌘</span>
                            <span className="mx-2 text-white-alpha-80">+</span>
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">U</span>
                        </div>
                    </article>
                    <article className="flex flex-column sm:flex-row w-full sm:justify-content-between sm:align-items-center mb-3 select-none cursor-pointer border-round-lg px-2 py-1 text-white-alpha-80 hover:bg-white-alpha-20 hover:text-white">
                        <div className="flex align-items-center">
                            <span className="border-circle flex-shrink-0 w-2rem h-2rem flex align-items-center justify-content-center bg-white-alpha-20">
                                <i className="pi pi-sync text-lg"></i>
                            </span>
                            <div className="ml-2">
                                <p className="font-semibold text-sm mt-0 mb-1">Resync your account</p>
                                <p className="font-normal text-xs text-white-alpha-80 mt-0 mb-0">Refresh all of your data</p>
                            </div>
                        </div>
                        <div className="hidden md:flex align-items-center md:align-self-center mt-3 sm:mt-0">
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">⌘</span>
                            <span className="mx-2 text-white-alpha-80">+</span>
                            <span className="px-2 py-1 border-white-alpha-20 border-1 border-round text-white-alpha-80 text-xs bg-white-alpha-20">/</span>
                        </div>
                    </article>
                </div>
                <div className="p-2 bg-white-alpha-10 border-top-1 border-white-alpha-20 flex flex-wrap sm:flex-nowrap align-items-center">
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">P</span>
                        Select
                    </p>
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">↑</span>
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">↓</span>
                        Navigate
                    </p>
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70 flex-align-items-center justify-content-center flex-row">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20 inline-flex">esc</span>
                        Close
                    </p>
                    <p className="w-full md:w-auto mt-0 mb-0 md:ml-auto text-xs text-white-alpha-70">4 results</p>
                </div>
            </Dialog>
        </>
    );
};

export default CommandMenu;
