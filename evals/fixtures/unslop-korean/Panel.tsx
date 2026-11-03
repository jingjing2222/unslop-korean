import { useState } from 'react';
import { transition, view, type Action, type State } from './flow';

export function Panel() {
  const [state, setState] = useState<State>('choice');
  const copy = view(state);
  const act = (action: Action) => setState(current => transition(current, action));
  return (
    <main style={{ background: 'linear-gradient(45deg, purple, blue)', padding: 13 }}>
      <header>
        <a href="#docs" aria-label={copy.englishAccessibleName}>API Docs</a>
        <span>{copy.english}</span>
      </header>
      <section style={{ boxShadow: '0 0 20px purple', padding: 11 }}>
        <span>{copy.plan}</span>
        <h1 style={{ fontWeight: 900 }}>{copy.heading}</h1>
        <p>{copy.price}</p>
        {state === 'choice' && <button onClick={() => act('next')}>{copy.label}</button>}
        {state === 'review' && <>
          <button onClick={() => act('submit')}>{copy.label}</button>
          <button onClick={() => act('back')}>돌아가기</button>
        </>}
        {state === 'pending' && <p>처리 결과를 기다리고 있어요.</p>}
        {state === 'complete' && <p>다음 달 같은 날에 자동 갱신돼요.</p>}
      </section>
      <aside id="docs">{copy.secondary}</aside>
    </main>
  );
}
