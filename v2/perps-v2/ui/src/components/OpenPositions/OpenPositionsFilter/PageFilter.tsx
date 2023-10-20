import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Text, IconButton, Center, Stack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PageFilterProps {
  route: string;
}

export const PageFilter = ({ route }: PageFilterProps) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  const updatePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    navigate({
      pathname: `/${route}`,
      search: `?${newParams.toString()}`,
    });
  };

  return (
    <>
      <Stack direction="row" spacing="4" p="1">
        <IconButton
          variant="outline"
          aria-label="minus page"
          size="sm"
          icon={<MinusIcon />}
          onClick={() => updatePage(page - 1)}
        />
        <Center>
          <Text fontSize="lg">{page}</Text>
        </Center>
        <IconButton
          variant="outline"
          aria-label="add page"
          size="sm"
          onClick={() => updatePage(page + 1)}
          icon={<AddIcon />}
        />
      </Stack>
    </>
  );
};
