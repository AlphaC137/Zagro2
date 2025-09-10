import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const token = await AsyncStorage.getItem("token");
  const fullUrl = `${API_URL}${url}`;
  const timeout = 45000; // 45 seconds for cold start

  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      signal: AbortSignal.timeout(timeout),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed with no error message' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      console.warn("Request timed out. The server might be waking up.");
    }
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWakingUp, setIsWakingUp] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsWakingUp(false);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      if (err instanceof Error && err.name === 'TimeoutError') {
        setIsWakingUp(true);
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, isWakingUp, refetch: fetchData };
};
