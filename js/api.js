const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const Route = {
  [Method.GET]: `${BASE_URL}/data`,
  [Method.POST]: `${BASE_URL}/`,
};
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Ошибка загрузки файла'
};

const getParsedFetchResponse = async (method = Method.GET, body = null) => {
  const response = await fetch(`${Route[method]}`, { method, body });

  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getDataFromServer = async () => getParsedFetchResponse();

const sendRequestWithBody = async (body) => getParsedFetchResponse(Method.POST, body);

export { getDataFromServer, sendRequestWithBody };
