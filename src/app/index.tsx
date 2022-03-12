import React, { FC, PropsWithChildren } from 'react';
import useInit from '../utils/use-init';
import useSelector from '../utils/use-selector';
import useStore from '../utils/use-store';

type Props = {};

const App: FC<PropsWithChildren<Props>> = props => {
  const store = useStore();
  const select = useSelector(state => ({
    waiting: state.countries.waiting,
    items: state.countries.items,
  }));

  useInit(() => {
    store.countries.load();
  });
  console.log('Select', select);

  return (
    <>
      <div>App 123</div>
      {select.items.map(item => (
        <div key={item._id} className=''>
          {item.title}
        </div>
      ))}
    </>
  );
};

export default App;
