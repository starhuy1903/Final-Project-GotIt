import lodash from "lodash";

export const convertSnakeCaseToCamelCase = (data: any) => {
  if (lodash.isArray(data)) {
    const newDataArr: any[] = data.map((item) =>
      convertSnakeCaseToCamelCase(item)
    );
    return newDataArr;
  }

  if (lodash.isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = lodash.camelCase(key);
      newData[newKey] = convertSnakeCaseToCamelCase(dataCopy[key]);
    });
    return newData;
  }

  return data;
};

export const convertCamelCaseToSnakeCase = (data: any) => {
  if (lodash.isArray(data)) {
    const newDataArr: any[] = data.map((item) =>
      convertCamelCaseToSnakeCase(item)
    );
    return newDataArr;
  }

  if (lodash.isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = lodash.snakeCase(key);
      newData[newKey] = convertCamelCaseToSnakeCase(dataCopy[key]);
    });
    return newData;
  }

  return data;
};
