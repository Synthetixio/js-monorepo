import {
  Box,
  Text,
  Table,
  Thead,
  TableContainer,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Tag,
  TagCloseButton,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Divider,
  Progress,
  Tabs,
  TabList,
  Tab,
  Tooltip,
  Switch,
} from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import Selector from '../components/Selector';

export const CustomExample = ({ content, buttonLabel, ...props }) => {
  return (
    <Box p={4} background={'whiteAlpha.200'}>
      <Text mb={2}>{content}</Text>
      <Button>test</Button>
      <Button variant={'outline'} colorScheme="cyan">
        test
      </Button>
      <Button variant={'outline'} colorScheme="gray">
        OUTLINE
      </Button>
      <TableContainer border="1px solid red">
        <Table colorScheme="whiteAlpha" size={'lg'}>
          <Thead>
            <Tr>
              <Th>Test</Th>
              <Th>Test deux</Th>
              <Th>Test Zwei</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>test</Td>
              <Td>tes deux</Td>
              <Td>test zwei</Td>
            </Tr>
            <Tr>
              <Td>test</Td>
              <Td>tes deux</Td>
              <Td>test zwei</Td>
            </Tr>
            <Tr>
              <Td>test</Td>
              <Td>tes deux</Td>
              <Td>test zwei</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Tag>
        TAGGG
        <TagCloseButton />
      </Tag>
      <br />
      <br />
      <Tag borderRadius={'full'}>21</Tag>
      <Box>
        <Badge variant={'solid'}>Hey I'm a Badge</Badge>
        <Badge variant={'outline'}>Hey I'm a Badge</Badge>
      </Box>
      <br />
      <Accordion allowToggle onChange={(index) => console.log(index)}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Some Random Ass Text
              </Box>
              <AccordionIcon color="cyan.500" />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Divider />
            Some Random things
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>Some Random Ass Text 2</AccordionButton>
          </h2>
          <AccordionPanel>Some Random things</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br />
      <Progress value={80} />
      <br />
      <Tabs variant={'solid-rounded'}>
        <TabList>
          <Tab>Harry</Tab>
          <Tab>Potter</Tab>
        </TabList>
      </Tabs>
      <Tabs variant={'soft-rounded'}>
        <TabList>
          <Tab>Harry</Tab>
          <Tab>Potter</Tab>
        </TabList>
      </Tabs>
      <br />
      <Tooltip label="sup" hasArrow>
        <InfoIcon />
      </Tooltip>
      <Switch />
      <Selector rightIcon={<InfoIcon />}>Clear Debt</Selector>
    </Box>
  );
};
