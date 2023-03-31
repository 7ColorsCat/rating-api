import { Box } from "@chakra-ui/react";
import Login from "../pages/login";

function App() {
    return (
        <Box
            w={"100%"}
            h={"100vh"}
            bgGradient="radial-gradient(rgb(253, 146, 4), rgb(251, 195, 102))"
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
        >
            <Login />
        </Box>
    );
}

export default App;
