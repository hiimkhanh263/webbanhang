import * as httpRequest from '~/utils/httpRequest';

export const updateProduct = async (q) => {
  try {
    const res = await httpRequest.update('/products/', {
      params: {
        q,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
