import React from "react";

import Logo from "../assets/logo.svg";

import { Header } from "../components/Header";
import { Heading, Text, VStack } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar Novo Bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily={"heading"}
          fontSize="xl"
          color="white"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder="Qual código do bolão?" />
        <Button title="CRIAR MEU BOLÃO" />

        <Text color="gray.200" fontSize={"sm"} textAlign="center" px={5} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>

      <VStack />
    </VStack>
  );
}
