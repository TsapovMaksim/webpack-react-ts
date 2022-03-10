import React, { FC, useEffect } from 'react';
import Form from './form';
import test from './test';

type Props = {};

const App: FC<Props> = props => {
  useEffect(() => {
    test();
  }, []);
  return (
    <>
      <div>App 123</div>
      <Form />
    </>
  );
};

export default App;
