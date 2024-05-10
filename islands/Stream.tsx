import { useEffect, useState } from "preact/hooks";

type Props = {
  query: string;
};

export default function Steram({ query }: Props) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/chat?q=" + query);

    eventSource.onmessage = (event) => {
      data.push(event.data);
      setData([...data]);
    };
    eventSource.onerror = (event) => {
      console.log(event);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [query]);

  return (
    <>
      <h2>Stream</h2>
      <p>Query: {query}</p>
      <div>Answer: {data.map((d) => d)}</div>
    </>
  );
}
