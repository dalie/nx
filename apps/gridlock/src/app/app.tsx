import { useEffect, useRef } from 'react';


export function App() {
  const scene = useRef();
  const engine = useRef(Engine.create());

  return <div ref={scene} style={{ width: '100%', height: '100%' }} />;
}

export default App;
