import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { map, size } from 'lodash';
import './ListPost.scss';
import { Post } from '../../../../api';
import {PostItem} from '../PostItem';

const postController = new Post();

export function ListPost(props) {

  const { reload } = props;
  const [posts, setPost] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPost(page);
        setPost(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages,
          totalDocs: response.totalDocs
        })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage)
  }
  
  if(!posts) return <Loader active inline='centered' />
  if(size(posts) === 0) return 'No hay ningún post';

  console.log(posts);

  return (
    <div className='list-post'>
      {map(posts, (post) => (
        <PostItem key={post._id} post={post} />
      ))}

      <div className='list-post__pagination'>
        <Pagination 
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
