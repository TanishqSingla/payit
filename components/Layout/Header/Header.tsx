import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function Header() {
	return (
		<Box h="16" m="0" p="4">
			<Flex alignItems="center">
				<Heading>Payit</Heading>
				<Spacer />
				<Button>Login</Button>
			</Flex>
		</Box>
	);
}
