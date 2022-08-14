import React, { Component } from 'react'
import { Box, Center, Flex, Heading, VStack, Input } from '@chakra-ui/react'

export default class JournalCover extends Component {
    render() {
        return (
            //A4 Paper ratio
            <Flex h={'500px'} w={'353.6px'} bg={'coverlight'}>
                <Flex flexGrow={1} bg={'coverdark'}></Flex>
                <Flex p={"2rem"} basis={0} flexGrow={5} align={'center'} direction={'column'}>
                    <Center flexGrow={1}>
                        <Heading>Bujots</Heading>
                    </Center>
                    <Flex flexGrow={2}>
                        <VStack>
                            <Input placeholder='Username'></Input>
                            <Input placeholder='Password'></Input>
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>
        )
    }
}
