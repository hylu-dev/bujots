import React from 'react';
import logo from './logo.svg';
import { Box, Center, Flex, Container } from '@chakra-ui/react'
import JournalCover from './components/JournalCover'

function App() {
  return (
    <Center height={'100vh'} width={'100vw'}>
      <JournalCover></JournalCover>
    </Center>
  );
}

export default App;
