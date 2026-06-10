import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/leaves';

// 🛠 Dynamically create instance inside each function
const createAxiosInstance = () => {
  const token = localStorage.getItem('token');
  console.log('🔑 Sending token:', token); // Optional: for debugging
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const applyLeave = async (leaveData, token) => {
  const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/leaves',
    headers: {
      Authorization: `Bearer ${token}`, // ✅ correct this line
    },
  });

  const response = await instance.post('/', leaveData);
  return response.data.data.leave;
};


const getMyLeaves = async () => {
  const instance = createAxiosInstance(); // ✅ fresh token
  const response = await instance.get('/mine');
  return response.data.data.leaves;
};

const getPendingLeaves = async () => {
  const instance = createAxiosInstance(); // ✅ fresh token
  const response = await instance.get('/');
  return response.data.data.leaves.filter((leave) => leave.status === 'pending');
};

const updateLeaveStatus = async (id, status) => {
  const instance = createAxiosInstance(); // ✅ fresh token
  await instance.patch(`/${id}/status`, { status });
};

export { applyLeave, getMyLeaves, getPendingLeaves, updateLeaveStatus };
