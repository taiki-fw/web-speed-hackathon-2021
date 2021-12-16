import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useHeadTitle } from '../../hooks/useHeadTitle';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import NotFoundContainer from '../NotFoundContainer';

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();

  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  useHeadTitle(isLoadingPost ? '読込中 - CAwitter' : post === null ? null : `${post.user.name} さんのつぶやき - CAwitter`)

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
