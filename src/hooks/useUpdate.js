import { useEffect, useState } from 'react';
import { httpRequest } from '~/utils/httpRequest';

const useUpdate = (url) => {
  const [data, setData] = useState(null);

  const updateProduct = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpRequest.update(url);

        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  return { data };
};

export default useUpdate;
