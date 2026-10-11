interface Config {
  baseUrl: string;
}

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export const config: Config = {
  baseUrl:
    configuredApiUrl ||
    (import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://supergearyt.vercel.app"),
};
