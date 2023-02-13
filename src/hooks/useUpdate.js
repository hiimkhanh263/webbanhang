// import { useEffect, useState } from 'react';
// import { httpRequest } from '~/utils/httpRequest';

// const useUpdate = (url) => {
//   const [dataUpdate, setDataUpdate] = useState(null);

//   useEffect(() => {
//     const updateData = async () => {
//       try {
//         const res = await httpRequest.put(url);

//         setDataUpdate(res.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     updateData();
//   }, [url]);

//   return { dataUpdate };
// };

// export default useUpdate;

import * as httpRequest from '~/utils/httpRequest';

export const updateProduct = async (id, updateProduct) => {
  try {
    const res = await httpRequest.put(`/products/${id}`, {
      data: updateProduct,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
