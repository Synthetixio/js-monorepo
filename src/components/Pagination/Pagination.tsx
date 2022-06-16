import clsx from 'clsx';
import ArrowDropdownLeftIcon from 'components/Icons/ArrowDropdownLeftIcon';
import ArrowDropdownRightIcon from 'components/Icons/ArrowDropdownRightIcon';
import SkipLeftIcon from 'components/Icons/SkipLeftIcon';
import SkipRightIcon from 'components/Icons/SkipRightIcon';

export interface PaginationLocalization {
  of?: string;
}

export interface PaginationProps {
  pageSize?: number;
  pageIndex: number;
  length: number;
  gotoPage: (page: number) => void;
  localization?: PaginationLocalization;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  gotoPage,
  length,
  pageSize = 8,
  localization = {
    of: 'of'
  },
  className
}) => {
  const pageCount = Math.ceil(length / pageSize);

  if (pageCount < 2) return null;

  const canNextPage = pageCount > pageIndex + 1;
  const startIndex = pageIndex * pageSize;
  const endIndex = Math.min(startIndex + pageSize, length);

  return (
    <div
      className={clsx(
        'ui-flex ui-justify-around ui-items-center ui-gap-5 ui-max-w-[350px]',
        className
      )}
    >
      <SkipLeftIcon
        active={pageIndex !== 0}
        className='ui-cursor-pointer'
        onClick={() => gotoPage(0)}
      />
      <ArrowDropdownLeftIcon
        active={pageIndex !== 0}
        className='ui-cursor-pointer'
        onClick={() => gotoPage(Math.max(pageIndex - 1, 0))}
      />
      <h6 className='ui-tg-caption ui-text-gray-500 ui-select-none'>
        {startIndex + 1}-{endIndex}
        &nbsp;
        {localization.of}&nbsp;
        {length}
      </h6>
      <ArrowDropdownRightIcon
        active={canNextPage}
        className='ui-cursor-pointer'
        onClick={() => canNextPage && gotoPage(pageIndex + 1)}
      />
      <SkipRightIcon
        active={canNextPage}
        className='ui-cursor-pointer'
        onClick={() => gotoPage(pageCount - 1)}
      />
    </div>
  );
};
