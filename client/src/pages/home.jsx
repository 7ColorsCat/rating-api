import {
    Badge,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    VStack,
    Heading,
    Skeleton,
    Text,
    HStack,
    Button,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import "../assets/scss/style.scss";
import { useEffect, useState } from "react";
import Logout from "../components/logout";
import AnimateTypeWriter from "../components/animate-typewriter";
import {
    disconnectSocket,
    emit,
    initiateSocketConnection,
    on,
} from "../services/socketio.service";

const feedEmojis = [
    {
        feed: "angry",
        hasMount: true,
        star: 1,
        content: "Tệ",
    },
    {
        feed: "sad",
        hasMount: true,
        star: 2,
        content: "Không hài lòng",
    },
    {
        feed: "ok",
        hasMount: false,
        star: 3,
        content: "Bình thường",
    },
    {
        feed: "good",
        hasMount: true,
        star: 4,
        content: "Hài lòng",
    },
    {
        feed: "happy",
        hasMount: false,
        star: 5,
        content: "Tuyệt vời",
    },
];

const Svgw3c = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 7 4"
                id="eye"
            >
                <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
            </symbol>
            <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 7"
                id="mouth"
            >
                <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
            </symbol>
        </svg>
    );
};

const FeedBackIcon = ({ feed, onClick, hasMount, active, star }) => {
    const isActive = active ? "active" : "";
    return (
        <li className={`${feed} ${isActive}`} onClick={() => onClick(star)}>
            <div>
                <svg className="eye left">
                    <use xlinkHref="#eye" />
                </svg>
                <svg className="eye right">
                    <use xlinkHref="#eye" />
                </svg>
                {hasMount && (
                    <svg className="mouth">
                        <use xlinkHref="#mouth" />
                    </svg>
                )}
            </div>
        </li>
    );
};

const Home = ({ isLoading, isAuthenticated, store, onLogout, onRated }) => {
    const [select, setSelect] = useState("ok");
    const [text, setText] = useState(
        feedEmojis.find((item) => item.feed === select).content
    );
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        initiateSocketConnection();

        emit("joinRoom", store);

        on("newRating", (data) => {
            if (data) setCustomer(data);
        });
        on("customerRated", () => {
            navigate("/thankyou");
        });

        return () => {
            disconnectSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setText(feedEmojis.find((item) => item.feed === select).content);
    }, [select]);

    if (!isAuthenticated) return <Navigate to={"/login"} />;

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const {
        _id,
        fullname,
        email,
        phone,
        orderId,
        orderTime,
        address,
        revenue,
    } = customer;

    const handleOnRating = (star) => {
        setSelect(() => feedEmojis.find((item) => item.star === star).feed);
    };

    const onSubmit = () => {
        const star = feedEmojis.find((item) => item.feed === select).star;
        axios
            .patch(import.meta.env.VITE_API_URL + "/customer", {
                id: _id,
                star,
                store,
            })
            .then(() => {
                onRated(true);
                setSelect("ok");
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <Skeleton isLoaded={!isLoading} fadeDuration={1} w={"full"}>
            {Object.keys(customer).length !== 0 ? (
                <Box
                    w={"100vw"}
                    minW={"375px"}
                    mx={"auto"}
                    py={6}
                    bgGradient={"linear(to-r, yellow.300, orange)"}
                    minH={"100vh"}
                >
                    <Box p={6} pt={0}>
                        <Card
                            shadow={"xl"}
                            textAlign={"center"}
                            backdropFilter={"auto"}
                            backdropBlur={"sm"}
                        >
                            <CardBody>
                                <VStack spacing={2}>
                                    <Heading fontSize={["lg", "xl"]}>
                                        {fullname}
                                    </Heading>
                                    <Text fontSize={"lg"}>{phone}</Text>
                                    <Text>{email}</Text>
                                    <Text fontStyle={"italic"}>{address}</Text>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                    <Box px={6}>
                        <Flex
                            justify={"space-between"}
                            gap={6}
                            direction={["column", "row"]}
                        >
                            <Card
                                w={["100%", "50%"]}
                                shadow={"xl"}
                                textAlign={"center"}
                            >
                                <CardHeader>
                                    <Heading
                                        as={"h3"}
                                        size={"sm"}
                                        textTransform={"uppercase"}
                                        fontWeight={"semibold"}
                                    >
                                        Mã hóa đơn
                                    </Heading>
                                </CardHeader>
                                <CardBody textAlign={"center"} py={0}>
                                    <Badge
                                        fontSize={"lg"}
                                        colorScheme="orange"
                                        p={2}
                                    >
                                        {orderId}
                                    </Badge>
                                    <Text
                                        fontSize={"sm"}
                                        my={2}
                                        fontStyle={"italic"}
                                    >
                                        Thời gian lập hóa đơn: {orderTime}
                                    </Text>
                                </CardBody>
                                <CardFooter>
                                    <Center p={2} rounded={"md"} w={"full"}>
                                        CH
                                        <Badge
                                            mx={2}
                                            size={{ base: "sm", xs: "xs" }}
                                        >
                                            {store}
                                        </Badge>
                                    </Center>
                                </CardFooter>
                            </Card>
                            <Card w={["100%", "50%"]} shadow={"xl"}>
                                <CardHeader>
                                    <Heading
                                        as={"h3"}
                                        size={"sm"}
                                        fontWeight={"semibold"}
                                        textAlign={"center"}
                                        textTransform={"uppercase"}
                                    >
                                        Tổng chi tiêu
                                    </Heading>
                                </CardHeader>
                                <CardBody textAlign={"center"} pt={0}>
                                    <Badge
                                        fontSize={"lg"}
                                        p={2}
                                        colorScheme="orange"
                                    >
                                        {formatter.format(revenue)}
                                    </Badge>
                                </CardBody>
                            </Card>
                        </Flex>
                    </Box>
                    <Box px={6} py={10}>
                        <Text fontSize={"lg"} textAlign={"center"} py={4}>
                            Đánh giá trải nghiệm mua hàng tại APJ
                        </Text>
                        <HStack
                            className="feedback"
                            justify={"center"}
                            spacing={6}
                        >
                            {feedEmojis.map((item, index) => (
                                <FeedBackIcon
                                    feed={item.feed}
                                    onClick={handleOnRating}
                                    key={index}
                                    hasMount={item.hasMount}
                                    active={select === item.feed}
                                    star={item.star}
                                />
                            ))}
                            <Svgw3c />
                        </HStack>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={text}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Text
                                    w={"full"}
                                    textAlign={"center"}
                                    py={2}
                                    fontWeight={"semibold"}
                                >
                                    {text}
                                </Text>
                            </motion.span>
                        </AnimatePresence>
                        <Button
                            colorScheme={"green"}
                            w={"xs"}
                            mx={"auto"}
                            my={2}
                            display={"block"}
                            onClick={() => onSubmit()}
                        >
                            Gửi
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box
                    w={"100vw"}
                    h={"100vh"}
                    bgGradient={"linear(to-r, yellow.300, orange)"}
                >
                    <Flex
                        justify={"center"}
                        alignItems={"center"}
                        direction={"column"}
                        h={"100%"}
                    >
                        <Heading
                            mb={"28"}
                            textTransform={"uppercase"}
                            fontWeight={"light"}
                            bg={"whiteAlpha.600"}
                            backdropFilter={"auto"}
                            backdropBlur={"md"}
                            px={8}
                            py={4}
                            textAlign={"center"}
                            rounded={"lg"}
                        >
                            Cửa hàng {store}
                        </Heading>
                        <AnimateTypeWriter />
                        <Text p={2} fontWeight={"semibold"}>
                            Chưa có đơn hàng...
                        </Text>
                    </Flex>
                </Box>
            )}
            <Logout onLogout={onLogout} />
        </Skeleton>
    );
};
export default Home;
