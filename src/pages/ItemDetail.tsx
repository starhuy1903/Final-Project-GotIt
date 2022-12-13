import { Loader } from '@ahaui/react';
import useTypedDispatch from 'hooks/useTypedDispatch';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetail } from 'store/actions/item';
import { Item } from 'types/item';

const ItemDetail = () => {
  const dispatch = useTypedDispatch();
  const { categoryId, itemId } = useParams();
  const [data, setData] = useState<Item | null>();
  const [loading, setLoading] = useState(false);
  const categoryIdNum = Number(categoryId);
  const itemIdNum = Number(itemId);

  const fetchData = async () => {
    setLoading(true);
    const res = await dispatch(fetchItemDetail(itemIdNum, categoryIdNum));
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="u-marginVerticalSmall u-widthFull u-flex u-justifyContentCenter" style={{ margin: '30px auto' }}>
      {loading ? (<Loader duration={500} size="large" />) : (
        <div className="u-flex">
          <div>
            <img src={data?.imageUrl} alt="image1" style={{ width: '300px' }} />
          </div>
          <div className="u-paddingLeftLarge u-paddingTopLarge u-text700">
            <div className="">
              <span className="u-fontBold">Description: </span>
              <span>{data?.description}</span>
            </div>
            <div>
              <span className="u-fontBold">Author: </span>
              <span>{data?.author.name}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ItemDetail;
