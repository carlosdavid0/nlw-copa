import { Center, Icon, Text } from "native-base";
import React from "react";

import { Fontisto } from "@expo/vector-icons";

import { useAuth } from "../hooks/useAuth";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export function SignIn() {
  const { signIn, user } = useAuth();

  return (
    <Center
      flex={1}
      bg="black"
      alignItems={"center"}
      justifyContent={"center"}
      p={7}
    >
      <Logo width={212} height={40} />
      <Button
        onPress={signIn}
        title="Entrar com o google"
        leftIcon={
          <Icon as={Fontisto} name="google" color={"white"} size="md" />
        }
        type="SECONDARY"
        mt={12}
      />
      <Text color={"white"} textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação de suaconta.
      </Text>
    </Center>
  );
}
