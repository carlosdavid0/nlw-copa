import { VStack, Icon } from 'native-base'
import React from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'

import { Octicons } from '@expo/vector-icons'

export default function Pools() {
    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title='Meus bolões' />

            <VStack mt={4} mx={4} borderBottomWidth={1} borderBottomColor={'gray.600'} pb={4} mb={4}>
                <Button title='BUSCAR BOLÃO POR CÓDIGO' leftIcon={<Icon as={Octicons} name='search' size={'md'} color={'black'} />} />
            </VStack>

        </VStack>
    )
}
