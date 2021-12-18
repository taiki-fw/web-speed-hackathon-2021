import { TermPage } from '../../components/term/TermPage';
import { useHeadTitle } from '../../hooks/useHeadTitle';

/** @type {React.VFC} */
const TermContainer = () => {
  useHeadTitle('利用規約 - CAwitter')
  return (
    <TermPage />
  );
};

export { TermContainer };
