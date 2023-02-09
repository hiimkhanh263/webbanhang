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
