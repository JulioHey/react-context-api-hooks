import { useCounterContext } from '../../contexts/CounterContext';

export const Home = () => {
  const [state, dispatch] = useCounterContext();
  return <h1>Oi</h1>;
};
