const MsgRecordListRow = ({ messages }) => {
  return (
    <tbody>
      {messages.map((msg) => (
        <tr key={msg.message} className="msgRow">
          <td>{msg.buyer.id}</td>
          <td>{msg.buyer.username}</td>
          <td>{msg.message}</td>
          <td>{msg.tokenName}</td>
          <td>{msg.dateTraded.substr(0, 10)}</td>
        </tr>
      ))}
    </tbody>
  );
};
export default MsgRecordListRow;
