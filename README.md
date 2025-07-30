import React, { createContext, useState, useEffect, ReactNode } from 'react';

// 🔹 Определяем тип для контекста
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// 🔹 Указываем тип для Provider (children)
interface AuthProviderProps {
  children: ReactNode;
}

// 🔹 Создаём контекст с типом (и значением по умолчанию — null или пустой объект)
export const AuthContext = createContext<AuthContextType | null>(null);

// 🔹 Компонент AuthProvider с типизацией
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Проверка токена при загрузке
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  // 🔹 Проверка: не забыть передать значение в Provider
  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};










################^^^**++



import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// 🔹 Интерфейсы

interface Questionnaire {
  id: number;
  title: string;
  createdAt: string;
  isPublished: boolean;
}

interface UserProfile {
  username: string;
  email: string;
  // Добавь другие поля по необходимости
}

interface QuestionData {
  text: string;
  type: 'Открытый' | 'Закрытый' | 'Множественный выбор' | 'Шкала';
  answers?: { text: string }[];
}

interface CheckAvailabilityResponse {
  isUsernameAvailable: boolean;
  isEmailAvailable: boolean;
}

// 🔹 Создание экземпляра axios
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7109',
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new (require('https')).Agent({  
    rejectUnauthorized: false // Только для dev (самоподписанные сертификаты)
  })
});

// 🔹 Перехватчик запроса: добавляем токен
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Перехватчик ответа: обработка 401
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      alert('Сессия истекла. Пожалуйста, войдите снова.');
      // Можно перенаправить на страницу входа:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🔹 Маппинг типа вопроса → ID
const getQuestionTypeId = (type: string): number => {
  switch (type) {
    case 'Открытый':
      return 1;
    case 'Закрытый':
      return 2;
    case 'Множественный выбор':
      return 3;
    case 'Шкала':
      return 4;
    default:
      throw new Error(`Неизвестный тип вопроса: ${type}`);
  }
};

// 🔹 API-функции

/**
 * Создание новой анкеты
 */
export const createQuestionnaire = async (title: string): Promise<{ questionnaireId: number }> => {
  try {
    const response: AxiosResponse<{ questionnaireId: number }> = await apiClient.post('/questionnaire/create', {
      Title: title,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при создании анкеты:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Добавление вопроса к анкете
 */
export const addQuestion = async (
  questionnaireId: number,
  questionData: QuestionData
): Promise<{ questionId: number }> => {
  try {
    const response: AxiosResponse<{ questionId: number }> = await apiClient.post(
      `/questionnaire/${questionnaireId}/questions/add-question`,
      {
        Text: questionData.text,
        QuestionType: getQuestionTypeId(questionData.type),
        Options: questionData.answers?.map((a) => ({ OptionText: a.text })) || [],
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при добавлении вопроса:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Получение списка анкет пользователя
 */
export const getUserSurveys = async (): Promise<Questionnaire[]> => {
  try {
    const response: AxiosResponse<{ questionnaires: Questionnaire[] }> = await apiClient.get('/user/questionnaires');
    return response.data.questionnaires;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при получении списка анкет:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Удаление анкеты
 */
export const deleteSurvey = async (questionnaireId: number): Promise<void> => {
  try {
    await apiClient.delete(`/questionnaire/${questionnaireId}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при удалении анкеты:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Обновление названия анкеты
 */
export const updateSurveyTitle = async (questionnaireId: number, newTitle: string): Promise<void> => {
  try {
    await apiClient.put(`/questionnaire/${questionnaireId}/title`, {
      NewTitle: newTitle,
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при обновлении названия анкеты:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Изменение статуса публикации анкеты
 */
export const updateSurveyStatus = async (questionnaireId: number, isPublished: boolean): Promise<void> => {
  try {
    await apiClient.put(`/questionnaire/${questionnaireId}/status`, {
      IsPublished: isPublished,
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при изменении статуса анкеты:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Получение профиля пользователя
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response: AxiosResponse<UserProfile> = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при получении данных пользователя:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

/**
 * Проверка доступности username и email
 */
export const checkUsernameAndEmail = async (username: string, email: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<CheckAvailabilityResponse> = await apiClient.post('/user/check-availability', {
      Username: username,
      Email: email,
    });

    const { isUsernameAvailable, isEmailAvailable } = response.data;

    if (!isUsernameAvailable) {
      alert('Имя пользователя уже занято.');
      return false;
    }

    if (!isEmailAvailable) {
      alert('Электронная почта уже используется.');
      return false;
    }

    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при проверке доступности:', axiosError.response?.data || axiosError.message);
    alert('Не удалось проверить доступность данных.');
    return false;
  }
};

/**
 * Обновление профиля пользователя
 */
export const updateUserProfile = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response: AxiosResponse<UserProfile> = await apiClient.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Ошибка при обновлении данных пользователя:', axiosError.response?.data || axiosError.message);
    throw error;
  }
};

export default apiClient;

