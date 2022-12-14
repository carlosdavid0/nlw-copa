import React from "react";


import { Header } from "../components/Header";
import { Heading, VStack } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Find() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header showBackButton title="Buscar por código" />

      <VStack mt={8} mx={5} alignItems="center">


        <Heading
          fontFamily={"heading"}
          fontSize="xl"
          color="white"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR" />
      </VStack>

      <VStack />
    </VStack>
  );
}
