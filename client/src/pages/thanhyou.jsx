import { Flex, Link, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
const ThankYou = () => {
    return (
        <Flex
            bg={"gray.100"}
            minH={"100vh"}
            w={"100vw"}
            justify={"center"}
            alignItems={"center"}
            direction={"column"}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Text fontSize={"3xl"}>Thank you!</Text>
                </motion.div>
            </AnimatePresence>
            <Link as={RouteLink} to="/">
                Tiếp tục
            </Link>
        </Flex>
    );
};

export default ThankYou;
