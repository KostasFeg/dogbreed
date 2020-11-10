import axios from 'axios';
const userUrl = '/api/users';

const signUp = async (credentials) => {
  const response = await axios.post(userUrl, credentials);
  return response.data;
};

export default { signUp };
