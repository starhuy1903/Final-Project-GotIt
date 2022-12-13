import MockerAdapter from 'axios-mock-adapter';
import { convertSnakeCaseToCamelCase } from '../../../utils/convertObject';
import api from '../../../api';
import { TypedDispatch, configureStore } from '../../store';
import * as itemActions from '../item';

describe('itemActions', () => {
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

  it('should fetch item list successful', async () => {
    if (store) {
      const categoryId = 1;
      const offset = 0;
      const limit = 20;
      const res = {
        total_items: 100,
        items: [
          {
            id: 1,
            description: 'item description',
            image_url: 'https://someplace.com/somelink.png',
            author: {
              id: 3,
              name: 'Somebody'
            },
            category_id: 1,
          },
          {
            id: 2,
            description: 'item description',
            image_url: 'https://someplace.com/somelink.png',
            author: {
              id: 3,
              name: 'Somebody'
            },
            category_id: 1,
          },
        ]
      };
      mock.onGet(`/categories/${categoryId}/items`, { params: { offset, limit } }).reply(200, res);

      const result = await dispatch(
        itemActions.fetchItemsList(offset, limit, categoryId)
      );
      // url exactly
      expect(mock.history.get[0].url).toEqual(`/categories/${categoryId}/items`);
      expect(result).toEqual(convertSnakeCaseToCamelCase(res));
    }
  });

  it('should create new item successful', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 201;
      const newItem = {
        description: 'item description',
        imageUrl: 'https://someplace.com/somelink.png'
      };
      const res = {
        id: 1,
        description: 'item description',
        image_url: 'https://someplace.com/somelink.png',
        author: {
          id: 3,
          name: 'Somebody'
        },
        category_id: 1
      };
      mock.onPost(`/categories/${categoryId}/items`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.createItem(categoryId, newItem)
      );
      // url exactly
      expect(mock.history.post[0].url).toEqual(`/categories/${categoryId}/items`);
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should create new item failed', async () => {
    if (store) {
      const categoryId = 1;
      const statusCode = 400;
      const newItem = {
        description: 'item description',
        imageUrl: 'https://someplace.com/somelink.png'
      };
      const res = {
        message: 'Bad Request',
        data: {
          description: [
            'Missing data for required field.',
            'Length must be between 1 and 200.'
          ],
          image_url: [
            'Missing data for required field.',
            'Not a valid URL.',
            'Longer than maximum length 200.'
          ]
        }
      };
      mock.onPost(`/categories/${categoryId}/items`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.createItem(categoryId, newItem)
      );
      // url exactly
      expect(mock.history.post[0].url).toEqual(`/categories/${categoryId}/items`);
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.error?.message).toEqual(res.message);
    }
  });

  it('should update item successful', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 200;
      const updatedItem = {
        description: 'item description',
        imageUrl: 'somelink.com',
      };
      const res = {
        description: 'item description',
        image_url: 'somelink.com',
      };
      mock.onPut(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.updateItem(itemId, categoryId, updatedItem)
      );
      // url exactly
      expect(mock.history.put[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should update item failed', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 400;
      const updatedItem = {
        description: 'item description',
        imageUrl: 'somelink.com',
      };
      const res = {
        message: 'Bad Request',
        data: {
          description: [
            'Missing data for required field.',
            'Length must be between 1 and 200.'
          ],
          image_url: [
            'Missing data for required field.',
            'Not a valid URL.',
            'Longer than maximum length 200.'
          ]
        }
      };
      mock.onPut(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.updateItem(itemId, categoryId, updatedItem)
      );
      // url exactly
      expect(mock.history.put[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should delete item successful', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 200;
      const res = {};
      mock.onDelete(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.deleteItem(itemId, categoryId)
      );
      // url exactly
      expect(mock.history.delete[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toEqual(true);

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should delete item failed: item not found', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 404;
      const res = { message: 'Item not found' };
      mock.onDelete(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.deleteItem(itemId, categoryId)
      );
      // url exactly
      expect(mock.history.delete[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toBeFalsy;

      // check store
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should fetch item detail successful', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 200;
      const res = {
        id: 1,
        name: 'item name',
        description: 'item description',
        image_url: 'somelink.com',
        author: {
          id: 3,
          name: 'Somebody'
        },
        category_id: 1
      };
      mock.onGet(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.fetchItemDetail(itemId, categoryId)
      );
      // url exactly
      expect(mock.history.get[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toEqual(convertSnakeCaseToCamelCase(res));
    }
  });

  it('should fetch item detail failed', async () => {
    if (store) {
      const categoryId = 1;
      const itemId = 1;
      const statusCode = 404;
      const res = {
        message: 'Item not found'
      };
      mock.onGet(`/categories/${categoryId}/items/${itemId}`).reply(statusCode, res);

      const result = await dispatch(
        itemActions.fetchItemDetail(itemId, categoryId)
      );
      // url exactly
      expect(mock.history.get[0].url).toEqual(`/categories/${categoryId}/items/${itemId}`);
      expect(result).toBeNull;
    }
  });
});
