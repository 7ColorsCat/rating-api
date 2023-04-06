import { Box, Flex, Text } from "@chakra-ui/react";
import "./animate-typewriter.css";

const AnimateTypeWriter = () => {
    return (
        <Box
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-r, yellow.300, orange)"}
        >
            <Flex
                justify={"center"}
                alignItems={"center"}
                h={"full"}
                direction={"column"}
            >
                <div className="typewriter">
                    <div className="slide">
                        <i></i>
                    </div>
                    <div className="paper"></div>
                    <div className="keyboard"></div>
                </div>
                <Text p={2} fontWeight={'semibold'} >Chưa có đơn hàng...</Text>
            </Flex>
        </Box>
    );
};

export default AnimateTypeWriter;
