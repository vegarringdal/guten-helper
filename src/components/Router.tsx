import React from "react";
/**
 * Components
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * utils
 */
import { httpConfig } from "../utils/httpConfig";
import { routes } from "../routes/routes";

/**
 * main app router
 * @returns
 */
export function Router() {
    return (
        <BrowserRouter basename={httpConfig.getBase()}>
            <div className="grid grid-rows-mainpage h-full">
                <div className="grid">
                    <Header />
                </div>

                <div className="grid h-full overflow-auto">
                    <Routes>
                        {routes.map((route) => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
                <div className="grid">
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}
