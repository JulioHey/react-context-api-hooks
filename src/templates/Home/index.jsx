import { useEffect, useState } from 'react';
import { useCounterContext } from '../../contexts/CounterContext';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';

export const Home = () => {
  const [state, actions] = useCounterContext();

  const handleError = async () => {
    actions
      .asyncError()
      .then((r) => console.log(r))
      .catch((e) => console.log(e.name, ':', e.message));
  };

  return (
    <div>
      <Heading>{state.counter}</Heading>;
      <div>
        <Button onButtonClick={actions.increase}>Increase</Button>
        <Button onButtonClick={actions.decrease}>Decrease</Button>
        <Button onButtonClick={actions.reset}>Reset</Button>
        <Button onButtonClick={() => actions.setCounter({ counter: 10 })}>set10</Button>
        <Button onButtonClick={() => actions.setCounter({ counter: 100 })}>set100</Button>
        <Button disabled={state.loading} onButtonClick={actions.asyncIncrease}>
          AsyncIncrease
        </Button>
        <Button disabled={state.loading} onButtonClick={handleError}>
          AsyncError
        </Button>
      </div>
    </div>
  );
};
