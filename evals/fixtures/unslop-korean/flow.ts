export type State = 'choice' | 'review' | 'pending' | 'complete';
export type Action = 'next' | 'back' | 'submit' | 'acknowledge';

export const terms = { amount: 9900, currency: 'KRW', renewal: 'monthly' } as const;

export function transition(state: State, action: Action): State {
  if (state === 'choice' && action === 'next') return 'review';
  if (state === 'review' && action === 'back') return 'choice';
  if (state === 'review' && action === 'submit') return 'pending';
  if (state === 'pending' && action === 'acknowledge') return 'complete';
  return state;
}

export function view(state: State) {
  return {
    heading: {
      choice: '다시 만나서 반가워요!',
      review: '신청 내용 확인',
      pending: '구독이 완료됐어요',
      complete: '구독을 시작했어요',
    }[state],
    price: '매월 9,900원이 결제돼요.',
    label: state === 'choice' ? '혜택 잠금 해제' : '구독 신청',
    secondary: 'API 문서에서 연결 상태를 확인할 수 있어요.',
    english: 'Welcome back, Alex! Search anything...',
    englishAccessibleName: 'Open API documentation',
    plan: 'PRO',
    error: '요청을 처리하지 못했어요. 다시 시도해 주세요.',
  };
}
