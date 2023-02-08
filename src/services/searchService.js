import * as httpRequest from '~/utils/httpRequest';

export const search = async (q) => {
  try {
    const res = await httpRequest.get('/products/', {
      params: {
        q,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};