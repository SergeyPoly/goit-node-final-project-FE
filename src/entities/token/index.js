import { useTokenStore } from './store';

const { clearToken } = useTokenStore.getState();

const getToken = () => useTokenStore.getState().token;

export { useTokenStore, clearToken, getToken };
