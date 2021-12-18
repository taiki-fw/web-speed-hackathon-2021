import { lazy, useEffect, useState, useCallback, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useHeadTitle } from '../../hooks/useHeadTitle';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer'
import { NewPostModalContainer } from '../NewPostModalContainer'
const NotFoundContainer = lazy(() => import('../NotFoundContainer'))
const PostContainer = lazy(() => import('../PostContainer'))
const TermContainer = lazy(() => import('../TermContainer'))
const TimelineContainer = lazy(() => import('../TimelineContainer'))
const UserProfileContainer = lazy(() => import('../UserProfileContainer'))

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);

  useHeadTitle('読込中 - CAwitter')

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
