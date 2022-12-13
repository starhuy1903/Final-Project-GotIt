import MockerAdapter from 'axios-mock-adapter';
import { convertSnakeCaseToCamelCase } from '../../../utils/convertObject';
import api from '../../../api';
import { TypedDispatch, configureStore } from '../../store';
import * as categoryActions from '../category';

describe('categoryActions', () => {
  let store: null | ReturnType<typeof configureStore> = null;
  let mock: MockerAdapter;
  let dispatch: TypedDispatch;

  beforeEach(() => {
    store = configureStore();
    dispatch = <TypedDispatch>store.dispatch;
  });

  beforeAll(() => {
    mock = new MockerAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch category list successful', async () => {
    if (store) {
      const offset = 0;
      const limit = 20;
      const res = {
        total_categories: 100,
        categories: [
          {
            id: 21,
            name: 'category name',
            description: 'category description',
            image_url: 'https://someplace.com/someimage.png',
          },
          {
            id: 22,
            name: 'category name',
            description: 'category description',
            image_url: 'https://someplace.com/someimage.png',
          },
        ],
      };
      mock.onGet('/categories', { params: { offset, limit } }).reply(200, res);

      const result = await dispatch(
        categoryActions.fetchCategoriesList(offset, limit)
      );
      // url exactly
      expect(mock.history.get[0].url).toEqual('/categories');
      expect(result).toEqual(convertSnakeCaseToCamelCase(res));
    }
  });

  it('should create new category successful', async () => {
    if (store) {
      const statusCode = 201;
      const newCategory = {
        name: 'category name',
        description: 'category description',
        imageUrl: 'https://someplace.com/someimage.png',
      };
      const res = {
        id: 1,
        name: 'category name',
        description: 'category description',
        image_url: 'https://someplace.com/someimage.png',
      };
      mock.onPost('/categories').reply(statusCode, res);

      const result = await dispatch(
        categoryActions.createCategory(newCategory)
      );
      // url exactly
      expect(mock.history.post[0].url).toEqual('/categories');
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should create new category failed', async () => {
    if (store) {
      const statusCode = 401;
      const newCategory = {
        name: 'category name',
        description: 'category description',
        imageUrl: 'https://someplace.com/someimage.png',
      };
      const res =
        {
          message: 'Invalid access token'
        };

      mock.onPost('/categories').reply(statusCode, res);

      const result = await dispatch(
        categoryActions.createCategory(newCategory)
      );
      // url exactly
      expect(mock.history.post[0].url).toEqual('/categories');
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should update category successful', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 200;
      const updatedCategory = {
        name: 'category name',
        description: 'category description',
        imageUrl: 'https://someplace.com/someimage.png',
      };
      const res = {
        name: 'category name',
        description: 'category description',
        image_url: 'https://someplace.com/someimage.png',
      };
      mock.onPut(`/categories/${categoryId}`).reply(statusCode, res);

      const result = await dispatch(
        categoryActions.updateCategory(categoryId, updatedCategory)
      );
      // url exactly
      expect(mock.history.put[0].url).toEqual(`/categories/${categoryId}`);
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should update category failed', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 400;
      const updatedCategory = {
        name: 'category name',
        description: 'category description',
        imageUrl: 'https://someplace.com/someimage.png',
      };
      const res = {
        message: 'Bad Request',
      };
      mock.onPut(`/categories/${categoryId}`).reply(statusCode, res);

      const result = await dispatch(
        categoryActions.updateCategory(categoryId, updatedCategory)
      );
      // url exactly
      expect(mock.history.put[0].url).toEqual(`/categories/${categoryId}`);
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should delete category successful', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 200;

      mock.onDelete(`/categories/${categoryId}`).reply(statusCode, {});

      const result = await dispatch(
        categoryActions.deleteCategory(categoryId)
      );
      // url exactly
      expect(mock.history.delete[0].url).toEqual(`/categories/${categoryId}`);
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should delete category failed', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 400;

      mock.onDelete(`/categories/${categoryId}`).reply(statusCode, {});

      const result = await dispatch(
        categoryActions.deleteCategory(categoryId)
      );
      // url exactly
      expect(mock.history.delete[0].url).toEqual(`/categories/${categoryId}`);
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });
});
