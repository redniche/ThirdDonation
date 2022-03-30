import BoardList from '../../components/board/BoardList';
import PanelLayout from '../../components/layout/PanelLayout';

const Board = () => {
  return (
    <PanelLayout title="공지사항">
      <section className="container">
        <BoardList />
      </section>
    </PanelLayout>
  );
};

export default Board;
