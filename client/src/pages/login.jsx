import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const Login = ({ onLogin, isLoading, error }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onLogin(username, password);
    };

    return (
        <Box
            w={"100vw"}
            h={"100vh"}
            bgGradient="radial-gradient(rgb(253, 146, 4), rgb(251, 195, 102))"
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
        >
            <Box
                maxW={"container.md"}
                shadow={"lg"}
                border={"2px"}
                borderColor={"whiteAlpha.500"}
                rounded={"xl"}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Box mx="auto" bg="transparent" p="8" borderRadius="md">
                        <form onSubmit={handleSubmit}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Tài khoản</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    variant={"filled"}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormControl id="password" mt="4" isRequired>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    variant={"filled"}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="gray"
                                mt="4"
                                w="full"
                                size="lg"
                                disabled={!username || !password}
                                isLoading={isLoading}
                            >
                                Đăng nhập
                            </Button>
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {error && (
                                        <Alert
                                            status="error"
                                            rounded={"lg"}
                                            my={"4"}
                                        >
                                            <AlertIcon />
                                            {error.message}
                                        </Alert>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </form>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Login;
