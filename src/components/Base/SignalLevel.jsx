import React, { useEffect, useState } from 'react';

function SignalLevel() {
  // const [signalLevel, setSignalLevel] = useState(navigator.connection.rtt); // navigator breaks down safari
  const [signalLevel, setSignalLevel] = useState(0);

  // useEffect(() => {
  //   setSignalLevel(navigator.connection.rtt);
  // }, [navigator.connection.rtt]);

  if (signalLevel <= 100) {
    return (
      <span className="signal">
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
      </span>
    );
  }

  if (signalLevel > 100 || signalLevel <= 500) {
    return (
      <span className="signal">
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item" />
      </span>
    );
  }
  if (signalLevel > 500 || signalLevel <= 1000) {
    return (
      <span className="signal">
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item " />
        <span className="signal__item" />
      </span>
    );
  }
  if (signalLevel > 1000 || signalLevel <= 2000) {
    return (
      <span className="signal">
        <span className="signal__item active" />
        <span className="signal__item active" />
        <span className="signal__item" />
        <span className="signal__item" />
        <span className="signal__item" />
      </span>
    );
  }
  if (signalLevel > 2000 || signalLevel <= 2500) {
    return (
      <span className="signal">
        <span className="signal__item active" />
        <span className="signal__item " />
        <span className="signal__item" />
        <span className="signal__item" />
        <span className="signal__item" />
      </span>
    );
  }
  if (signalLevel > 2000 || signalLevel <= 3000) {
    return (
      <span className="signal">
        <span className="signal__item" />
        <span className="signal__item" />
        <span className="signal__item" />
        <span className="signal__item" />
        <span className="signal__item" />
      </span>
    );
  }
}

export default React.memo(SignalLevel);
