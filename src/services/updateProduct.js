import * as httpRequest from '~/utils/httpRequest';

export const updateProduct = async () => {
  try {
    const res = await httpRequest.put('/products/7', { data: { sold: 30 } });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
