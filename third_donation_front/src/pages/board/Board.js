import BoardList from './BoardList';
import PanelLayout from '../../components/layout/PanelLayout';

const Board = () => {
  return (
    <PanelLayout title="게시판">
      <section className="container">
        <BoardList />
      </section>
    </PanelLayout>
  );
};

export default Board;
