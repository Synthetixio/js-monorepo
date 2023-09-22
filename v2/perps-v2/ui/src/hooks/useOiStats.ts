import { useState, useEffect } from 'react';

interface ApiResponse {
  result: {
    rows: Row[];
  };
}

interface Row {
  short: number;
  long: number;
  day: string;
}

interface ShortLoss {
  shortTotal: number;
  longTotal: number;
  absoluteValue: number;
}

const useOiStats = (DUNE_API_KEY: string, period: 'W' | 'M' | 'Y') => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalShortLoss, setTotalShortLoss] = useState<ShortLoss | null>(null);
  const [lastRow] = useState<Row | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.dune.com/api/v1/query/2648712/results?api_key=${DUNE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const sortedData: ApiResponse = {
          ...responseData,
          result: {
            ...responseData.result,
            rows: [...responseData.result.rows].sort(
              (a, b) => Date.parse(a.day) - Date.parse(b.day)
            ),
          },
        };

        const endDate = new Date();
        let startDate: Date;

        switch (period) {
          case 'M':
            startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 31);
            break;
          case 'W':
            startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 7);
            break;
          case 'Y':
          default:
            startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 365);
            break;
        }

        const filteredRows: Row[] = sortedData.result.rows.filter(
          (row) =>
            Date.parse(row.day) >= startDate.getTime() && Date.parse(row.day) <= endDate.getTime()
        );

        const transformedRowsFormatted: Row[] = filteredRows.map((row: Row) => {
          const date = new Date(row.day);

          let formattedDate = '';
          switch (period) {
            case 'M':
            case 'W':
              formattedDate = date.toLocaleString('en-EN', {
                month: '2-digit',
                day: '2-digit',
                timeZone: 'UTC',
              });
              break;
            case 'Y':
            default:
              formattedDate = date.toLocaleString('en-EN', {
                month: 'short',
                timeZone: 'UTC',
              });
              break;
          }

          return {
            ...row,
            dayFormatted: formattedDate,
          };
        });

        const lastRow = transformedRowsFormatted[transformedRowsFormatted.length - 1];
        const totalLongShortAbsoluteValue = {
          longTotal: lastRow.long,
          shortTotal: lastRow.short,
          absoluteValue: lastRow.long - lastRow.short,
        };

        setTotalShortLoss(totalLongShortAbsoluteValue);

        setData({
          ...sortedData,
          result: {
            ...sortedData.result,
            rows: transformedRowsFormatted,
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
  }, [DUNE_API_KEY, period]);

  return { data, error, loading, totalShortLoss, lastRow };
};

export default useOiStats;
