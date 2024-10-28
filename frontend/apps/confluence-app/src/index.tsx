import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingPage from "@common/pages/loading/LoadingPage";
import NotFoundPage from "@common/pages/not-found/NotFoundPage";

// Global styles
import "@atlaskit/css-reset";

// Pages
const RequirementsPage = React.lazy(() => import("@/pages/requirements/RequirementsPage"));

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL ?? "/"}>
        <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path="requirements" element={<RequirementsPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Suspense>
    </BrowserRouter>,
    document.getElementById("root"),
);
