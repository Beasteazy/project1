import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {publicRoutes,privateRoutes} from "../router/routes";

const AppRouter = () => {
    return (
        <div>
            {privateRoutes.map(route =>
                <Routes>
                    <Route
                        exact path = {route.path}
                        element = {route.element}
                    >
                    </Route>
                </Routes>
            )}
            {publicRoutes.map(route =>
                <Routes>
                    <Route
                        exact path = {route.path}
                        element = {route.element}
                    >
                    </Route>
                </Routes>
            )}
        </div>

    );
};

export default AppRouter;


// <Routes>
//
//         <Route
//             path="/about"
//             element={<About/>}
//         >
//         </Route>
//
//         <Route
//             exact path ="/posts"
//             element={<Posts/>}
//         >
//         </Route>
//
//         <Route
//             exact path = '/posts/:id'
//             element={<PostIdPage/>}
//         >
//         </Route>
//
//         <Route
//             path="/error"
//             element={<Error/>}
//         >
//         </Route>
//
//         <Route
//             path="*"
//             element={<Navigate to = "/posts" />}
//         >
//         </Route>
//
// </Routes>