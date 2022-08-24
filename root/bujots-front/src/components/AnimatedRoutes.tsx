import { Route, Routes, useLocation } from "react-router-dom";
import Login from '../pages/Login'
import Journal from '../pages/Journal';

import { AnimatePresence } from 'framer-motion';

export default function AnimatedRoute() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />}/>
                <Route path="/journal" element={<Journal />}/>
                <Route path="/journal/:id" element={<Journal />}/>
            </Routes>
        </AnimatePresence>
    );
}
