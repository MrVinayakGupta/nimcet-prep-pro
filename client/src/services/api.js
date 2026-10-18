import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth
export const loginAPI = (email, password) => api.post('/auth/login', { email, password });
export const registerAPI = (name, email, password) => api.post('/auth/register', { name, email, password });
export const googleLoginAPI = (data) => api.post('/auth/google', data);
export const getProfile = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);

// Subjects
export const getSubjects = () => api.get('/subjects');

// Chapters
export const getChaptersBySubject = (subjectId) => api.get(`/chapters/subject/${subjectId}`);
export const getChapterById = (chapterId) => api.get(`/chapters/${chapterId}`);

// Topics
export const getTopicsByChapter = (chapterId) => api.get(`/topics/chapter/${chapterId}`);
export const getTopicById = (topicId) => api.get(`/topics/${topicId}`);

export const getQuestionsBySubject = (subjectId, params = {}) => api.get(`/questions/subject/${subjectId}`, { params });
export const getQuestionsByChapter = (chapterId, params = {}) => api.get(`/questions/chapter/${chapterId}`, { params });
export const getQuestionsByTopic = (topicId, params = {}) => api.get(`/questions/topic/${topicId}`, { params });
export const getQuestionById = (questionId) => api.get(`/questions/${questionId}`);
export const getTopicStats = (topicId) => api.get(`/questions/topic/${topicId}/stats`);
export const submitAnswer = (questionId, answer) => api.post(`/questions/${questionId}/submit`, { answer });
export const toggleBookmark = (questionId) => api.post(`/questions/${questionId}/bookmark`);
export const getBookmarks = () => api.get('/questions/bookmarks');
export const getAvailableYears = () => api.get('/questions/years');
export const getYearStats = () => api.get('/questions/years?detail=true');
export const getQuestionsByYear = (year) => api.get(`/questions/year/${year}`);
export const getCatQuestions = (params = {}) => api.get('/questions/cat', { params });
export const getUserAnswers = () => api.get('/questions/user/answers');

// Mock Tests
export const generateMockTest = (params) => api.post('/mock-tests/generate', params);
export const submitMockTest = (testId, answers) => api.post(`/mock-tests/${testId}/submit`, answers);
export const getMockTestResult = (testId) => api.get(`/mock-tests/${testId}/result`);
export const getMockTestHistory = () => api.get('/mock-tests/history');

// AI
export const getAIExplanation = (questionId) => api.post('/ai/explain', { questionId });

// Dashboard
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getSubjectProgress = () => api.get('/dashboard/subject-progress');
export const getRecentActivity = () => api.get('/dashboard/recent-activity');
export const getWeakAreas = () => api.get('/dashboard/weak-areas');

export default api;
