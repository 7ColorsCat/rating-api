import { Skeleton } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const Home = ({ isLoading, isAuthenticated }) => {
    if (!isAuthenticated) return <Navigate to={"/login"} />;

    return (
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
            Home page
        </Skeleton>
    );
};
export default Home;
