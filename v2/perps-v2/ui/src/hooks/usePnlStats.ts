import { useState, useEffect } from 'react';
import UseDateFormat from './useDateFormat';
interface ApiResponse {
  result: {
    rows: Row[];
  };
}

interface Row {
  daily_fee: number;
  daily_pnl: number;
  day: string;
  dayFormatted?: string;
  loss: number;
  net_to_stakers: number;
  profit: number;
  total_fees: number;
  total_pnl: number;
}

const UsePnlStats = (period: 'W' | 'M' | 'Y') => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastStakers, setLastStakers] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://synthetix.io/api/pnl`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const {
          result: { result },
        } = await response.json();

        const sortedData: ApiResponse = {
          ...result,
          result: {
            ...result,
            rows: [...result.rows].sort((a, b) => Date.parse(a.day) - Date.parse(b.day)),
          },
        };

        const currentDate = new Date();
        const filteredRows = sortedData.result.rows
          .sort((a, b) => {
            const aDate = new Date(a.day.replace(' ', 'T').replace(' UTC', 'Z'));
            const bDate = new Date(b.day.replace(' ', 'T').replace(' UTC', 'Z'));
            return aDate.getTime() - bDate.getTime();
          })
          .filter((row: Row) => {
            const rowDate = new Date(row.day.replace(' ', 'T').replace(' UTC', 'Z'));
            switch (period) {
              case 'W':
                return rowDate.getTime() >= currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
              case 'M':
                return (
                  rowDate.getTime() >=
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    currentDate.getDate()
                  ).getTime()
                );
              case 'Y':
                return (
                  rowDate.getTime() >=
                  new Date(
                    currentDate.getFullYear() - 1,
                    currentDate.getMonth(),
                    currentDate.getDate()
                  ).getTime()
                );
              default:
                return true;
            }
          });

        const transformedRows: Row[] = filteredRows.map((row: Row) => {
          const formattedDate = UseDateFormat(row.day, period);
          return {
            ...row,
            dayFormatted: formattedDate,
          };
        });

        const lastRow = transformedRows[transformedRows.length - 1];
        if (lastRow) {
          const lastStakers = lastRow.total_pnl;
          setLastStakers(lastStakers);
        }

        setData({
          ...sortedData,
          result: {
            ...sortedData.result,
            rows: transformedRows,
          },
        });

        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);
  return { data, error, loading, lastStakers };
};

export default UsePnlStats;
