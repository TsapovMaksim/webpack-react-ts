import React, { PropsWithChildren } from 'react';

interface Props {
  test: string;
}

const Some: React.FC<PropsWithChildren<Props>> = props => {
  return (
    <>
      <div>Some</div>
      <p>Someeeasdfsadfsdf asdfsaf </p>
      <div className=''>{props.children}</div>
    </>
  );
};

export default React.memo(Some);
