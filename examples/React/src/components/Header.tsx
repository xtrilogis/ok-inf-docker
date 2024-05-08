import React from "react";
import { Heading, Flex, Divider} from "@chakra-ui/react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1rem"
          bg="gray.400"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="sm">My Favorit Songs</Heading>
          </Flex>
        </Flex>
      );
  };

export default Header;