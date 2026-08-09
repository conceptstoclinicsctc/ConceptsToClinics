import client from './client';

export interface VersionConfig {
  minRequiredVersion: string;
  latestVersion: string;
  downloadUrl: string;
  message: string;
}

export const fetchVersionConfig = async (): Promise<VersionConfig> => {
  const response = await client.get<VersionConfig>('/config/version');
  return response.data;
};
