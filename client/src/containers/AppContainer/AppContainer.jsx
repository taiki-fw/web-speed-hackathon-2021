import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer'
import { NewPostModalContainer } from '../NewPostModalContainer'
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'))
const PostContainer = React.lazy(() => import('../PostContainer'))
const TermContainer = React.lazy(() => import('../TermContainer'))
const TimelineContainer = React.lazy(() => import('../TimelineContainer'))
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'))

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<Suspense fallback={<div></div>}><TimelineContainer /></Suspense>} path="/" />
          <Route element={<Suspense fallback={<div></div>}><UserProfileContainer /></Suspense>} path="/users/:username" />
          <Route element={<Suspense fallback={<div></div>}><PostContainer /></Suspense>} path="/posts/:postId" />
          <Route element={<Suspense fallback={<div></div>}><TermContainer /></Suspense>} path="/terms" />
          <Route element={<Suspense fallback={<div></div>}><NotFoundContainer /></Suspense>} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
