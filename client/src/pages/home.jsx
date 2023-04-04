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
    Text,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const Home = ({ isLoading, isAuthenticated, store }) => {
    if (!isAuthenticated) return <Navigate to={"/login"} />;

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
            <Box p={6}>
                <Card p={6} shadow={"xl"} rounded={"xl"} textAlign={"center"}>
                    <Heading>Tran Thien Khanh</Heading>
                    <p>9876 543 211</p>
                    <p>admin@gmail.com</p>
                    <p>106 Nghia Thuc, P.5, Q.5, Ho Chi Minh</p>
                </Card>
            </Box>
            <Box px={6}>
                <Flex justify={"space-between"} gap={2}>
                    <Card bg={"gray.200"} w={"50%"} shadow={"xl"}>
                        <CardHeader>
                            <Heading as={"h3"} size={"sm"} textAlign={"center"}>
                                Order ID
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text textAlign={"center"}>12312321231231</Text>
                        </CardBody>
                        <CardFooter>
                            <Center
                                p={2}
                                bg={"blue.400"}
                                w={"full"}
                                color={"white"}
                                rounded={"lg"}
                            >
                                CH
                                <Badge mx={2} size={"sm"}>
                                    {store}
                                </Badge>
                            </Center>
                        </CardFooter>
                    </Card>
                    <Card bg={"gray.200"} w={"50%"} shadow={"xl"}>
                        <CardHeader>
                            <Heading as={"h3"} size={"sm"} textAlign={"center"}>
                                Revenue
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text textAlign={"center"}>
                                {formatter.format(22000000)}
                            </Text>
                        </CardBody>
                    </Card>
                </Flex>
            </Box>
        </Skeleton>
    );
};
export default Home;
