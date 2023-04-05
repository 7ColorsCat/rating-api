import {
    Badge,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    Skeleton,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const Home = ({ isLoading, isAuthenticated, store }) => {
    if (!isAuthenticated) return <Navigate to={"/login"} />;

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return (
        <Skeleton
            isLoaded={!isLoading}
            fadeDuration={1}
            bgGradient={"linear(to-r, yellow.300, orange)"}
            py={6}
        >
            <Box p={6} pt={0}>
                <Card
                    p={6}
                    shadow={"xl"}
                    textAlign={"center"}
                    backdropFilter={"auto"}
                    backdropBlur={"sm"}
                >
                    <Heading>Tran Thien Khanh</Heading>
                    <p>9876 543 211</p>
                    <p>admin@gmail.com</p>
                    <p>106 Nghia Thuc, P.5, Q.5, Ho Chi Minh</p>
                </Card>
            </Box>
            <Box px={6}>
                <Flex justify={"space-between"} gap={6}>
                    <Card w={"50%"} shadow={"xl"} textAlign={"center"}>
                        <CardHeader>
                            <Heading
                                as={"h3"}
                                size={"lg"}
                                textTransform={"uppercase"}
                                fontWeight={"light"}
                            >
                                Order ID
                            </Heading>
                        </CardHeader>
                        <CardBody textAlign={"center"}>
                            <Badge fontSize={"md"} colorScheme="orange" p={2}>
                                12312321231231
                            </Badge>
                        </CardBody>
                        <CardFooter>
                            <Center p={2} rounded={"md"} w={"full"}>
                                CH
                                <Badge mx={2} size={"sm"}>
                                    {store}
                                </Badge>
                            </Center>
                        </CardFooter>
                    </Card>
                    <Card w={"50%"} shadow={"xl"}>
                        <CardHeader>
                            <Heading
                                as={"h3"}
                                size={"lg"}
                                fontWeight={"light"}
                                textAlign={"center"}
                                textTransform={"uppercase"}
                            >
                                Revenue
                            </Heading>
                        </CardHeader>
                        <CardBody textAlign={"center"}>
                            <Badge fontSize={"md"} p={2} colorScheme="orange">
                                {formatter.format(22000000)}
                            </Badge>
                        </CardBody>
                    </Card>
                </Flex>
            </Box>
        </Skeleton>
    );
};
export default Home;
