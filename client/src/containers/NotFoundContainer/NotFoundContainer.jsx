import { NotFoundPage } from '../../components/application/NotFoundPage';
import { useHeadTitle } from '../../hooks/useHeadTitle';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  useHeadTitle('ページが見つかりません - CAwitter')
  return (
    <NotFoundPage />
  );
};

export { NotFoundContainer };
