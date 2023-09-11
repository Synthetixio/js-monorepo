import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

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

const UseOiStats = (DUNE_API_KEY: string, period: 'W' | 'M' | 'Y') => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalShortLoss, setTotalShortLoss] = useState<ShortLoss | null>(null);
  const [lastRow, setLastRow] = useState<Row | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.dune.com/api/v1/query/2648712/results?api_key=${DUNE_API_KEY}`
        );

        const sortedData: ApiResponse = {
          ...response.data,
          result: {
            ...response.data.result,
            rows: [...response.data.result.rows].sort(
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
        setLastRow(lastRow);
        setData({
          ...sortedData,
          result: {
            ...sortedData.result,
            rows: transformedRowsFormatted,
          },
        });

        setError(null);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [DUNE_API_KEY, period]);

  return { data, error, loading, totalShortLoss, lastRow };
};

export default UseOiStats;