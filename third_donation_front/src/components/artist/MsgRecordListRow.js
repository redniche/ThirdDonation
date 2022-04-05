const MsgRecordListRow = ({ messages }) => {
  return (
    <tbody>
      {messages.map((msg) => (
        <tr key={msg.id} classNamem="msgRow">
          <td>{msg.name}</td>
          <td>{msg.content}</td>
          <td>{msg.nftName}</td>
          <td>{msg.price}</td>
        </tr>
      ))}
    </tbody>
  );
};
export default MsgRecordListRow;
