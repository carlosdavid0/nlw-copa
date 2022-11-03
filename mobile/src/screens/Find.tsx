import React from "react";

import Logo from "../assets/logo.svg";

import { Header } from "../components/Header";
import { Heading, Text, VStack } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Find() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header showBackButton title="Buscar por código" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily={"heading"}
          fontSize="xl"
          color="white"
          my={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input mb={2} placeholder="Qual nome do seu bolão?" />
        <Button title="BUSCAR" />
      </VStack>

      <VStack />
    </VStack>
  );
}
