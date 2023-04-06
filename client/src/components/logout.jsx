import { Button, Image } from "@chakra-ui/react";
import logoutImg from "../assets/logout.png";

const Logout = ({ onLogout }) => {
    return (
        <Button
            pos={"fixed"}
            top={6}
            right={6}
            onClick={() => onLogout()}
            title="Đăng xuất"
            bg={'transparent'}
            _hover={{ bg: 'transparent' }}
        >
            <Image src={logoutImg} />
        </Button>
    );
};

export default Logout;
