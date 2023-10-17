import { NotificationManager } from 'react-notifications';
// 'info', 'success', 'warning', 'error'
const notification = ({
  type,
  message = '',
  title = 'MTC',
  timeOut = 5000,
  callback = () => {},
  priority = false,
}) => {
  return NotificationManager[type.toLowerCase()](
    message,
    title,
    timeOut,
    callback,
    priority,
  );
};

export default notification;
