import React from 'react'
import { Link } from "react-router-dom";
import "../../styles/App.css";
import { motion, AnimatePresence } from 'framer-motion';
import { LuCircleChevronDown  } from 'react-icons/lu';
import {
    IoSearchCircle   

    } from "react-icons/io5";

const AccordionMenu = ({ title, children }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };


    return (
        <li className={`w-full border rounded-xl border mb-1`}>
            
            {/* button */}
            <Link
            to={`/Log`}
            className={`flex items-center justify-between text-gray-100  w-full p-1 text-left ${isOpen ? "rounded-t-xl" : "rounded-xl"} ${isOpen ? "text-white" : "text-white"}`} 
            onClick={toggleAccordion}
            >
                <IoSearchCircle  className=" flex-initial w-10 mt-2 mx-2 text-white tsize-70 font-medium"  />
                <span className="flex-initial w-full tsize-70 font-medium">{title}</span>

                <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
                >
                    <LuCircleChevronDown  className={`flex-initial w-10 w-6 h-6 ${isOpen ? "text-gray-50" : "text-white"}`} />
                </motion.span>
            </Link>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
                        className='overflow-hidden'
                    >
                        <div className="p-2 rounded-b-xl">
                            {children}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
            

        </li>
    )
}

export default AccordionMenu