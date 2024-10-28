import { Outlet, useSearchParams } from "react-router-dom";
import NotLicensedPage from "@common/pages/not-licensed/NotLicensedPage";

const LicenseCheckLayout = () => {
    const [searchParams] = useSearchParams();

    if (searchParams.get("lic") === "active") {
        return <Outlet />;
    }
    return <NotLicensedPage />;
};

export default LicenseCheckLayout;
