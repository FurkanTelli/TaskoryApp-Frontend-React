import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import "./SideBarComponent.css";
import { setShowSideBar } from '../../store/userSlice';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useNavigate } from 'react-router-dom';

const SidebarComponent = () => {
    const sidebar = useSelector(state => state?.userStore?.showSideBar)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);



    // useEffect(() => {
    //     console.log(sidebar)
    // }, [sidebar]);

    return (
        <div className='my-toolbar-component sidebar'>
            {sidebar ?
                <div>
                    <Sidebar visible={sidebar} header="Taskory" onHide={() => dispatch(setShowSideBar(false))} className="w-full md:w-20rem lg:w-30rem">
                        <div className="overflow-y-auto">
                            <ul className="list-none p-3 m-0">
                                <li>
                                    {/* <StyleClass nodeRef={btnRef1} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                        <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                            <span className="font-medium">FAVORITES</span>
                                            <i className="pi pi-chevron-down"></i>
                                            <Ripple />
                                        </div>
                                    </StyleClass> */}
                                    <ul className="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-home mr-2"></i>
                                                <span className="font-medium">Task Dashboard</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-bookmark mr-2"></i>
                                                <span className="font-medium">Create Task</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-chart-line mr-2"></i>
                                                        <span className="font-medium">Expenses</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        {/* <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-users mr-2"></i>
                                                <span className="font-medium">Team</span>
                                                <Ripple />
                                            </a>
                                        </li> */}
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-comments mr-2"></i>
                                                <span className="font-medium">Messages</span>
                                                {/* <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                    3
                                                </span> */}
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-calendar mr-2"></i>
                                                <span className="font-medium">Calendar</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => navigate("/Settings")} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-cog mr-2"></i>
                                                <span className="font-medium">Settings</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* <ul className="list-none p-3 m-0">
                                <li>
                                    <StyleClass nodeRef={btnRef4} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                        <div ref={btnRef4} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                            <span className="font-medium">APPLICATION</span>
                                            <i className="pi pi-chevron-down"></i>
                                            <Ripple />
                                        </div>
                                    </StyleClass>
                                    <ul className="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-folder mr-2"></i>
                                                <span className="font-medium">Projects</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-chart-bar mr-2"></i>
                                                <span className="font-medium">Performance</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-cog mr-2"></i>
                                                <span className="font-medium">Settings</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul> */}
                        </div>
                    </Sidebar>
                    <Button icon="pi pi-arrow-right" onClick={() => dispatch(setShowSideBar(true))} />
                </div>
                : ""
            }
        </div>
    )
}

export default SidebarComponent