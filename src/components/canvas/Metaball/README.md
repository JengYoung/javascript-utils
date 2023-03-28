# 메타볼 애니메이션 구현

![ezgif com-video-to-gif (4)](https://user-images.githubusercontent.com/78713176/228183888-5c51d602-158d-47ea-bf08-b9036826f4ac.gif)

애니메이션을 구현하는 과정 중, 크게 최적화 이전과 이후의 로직 2가지 케이스로 나누어 구현하였습니다.

순수 자바스크립트와 타입스크립트만 사용하였으며, 기본적으로 제공되는 `CanvasAPI`로 애니메이션을 구현했습니다.

> 💡 자세한 설계 및 구현과정이 궁금하신가요?!
> 아래의 글들을 읽어주세요! 누구든지 쉽게 만들 수 있게 문서화해놓았어요 🙆🏻🙆🏻‍♀️

- [[Project] 포트폴리오 제작기 - 6. (2) 메타볼 애니메이션 구현기](https://velog.io/@young_pallete/Project-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%A0%9C%EC%9E%91%EA%B8%B0-6.-2-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%EA%B8%B0-%EC%B5%9C%EC%A0%81%ED%99%94-%EC%9D%B4%EC%A0%84)
- [[2D 메타볼 애니메이션 구현] 1. 메타볼 객체 설계하기.](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-1.-%EB%A9%94%ED%83%80%EB%B3%BC-%EA%B0%9D%EC%B2%B4-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 2. 확장성을 고려하며 Canvas 설계하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-2.-Canvas-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 3. 팩토리 메서드 패턴으로 메타볼 핸들링 객체 생성하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-3.-%ED%8C%A9%ED%86%A0%EB%A6%AC-%EB%A9%94%EC%84%9C%EB%93%9C-%ED%8C%A8%ED%84%B4%EC%9C%BC%EB%A1%9C-%EB%A9%94%ED%83%80%EB%B3%BC-%ED%95%B8%EB%93%A4%EB%A7%81-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 4. Metaballs의 업데이트 로직을 옵저버 패턴으로 설계하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-4.-Metaballs%EC%9D%98-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EB%A1%9C%EC%A7%81%EC%9D%84-%EC%98%B5%EC%A0%80%EB%B2%84-%ED%8C%A8%ED%84%B4%EC%9C%BC%EB%A1%9C-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 5. 캔버스 애니메이션 실행하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-4.-%EC%BA%94%EB%B2%84%EC%8A%A4-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 6. 메타볼 움직임 구현하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-6.-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%9B%80%EC%A7%81%EC%9E%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 7. 메타볼 그리는 로직 전략 패턴으로 리팩토링하기](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-7.-%EB%A9%94%ED%83%80%EB%B3%BC-%EA%B7%B8%EB%A6%AC%EB%8A%94-%EB%A1%9C%EC%A7%81-%EC%A0%84%EB%9E%B5-%ED%8C%A8%ED%84%B4%EC%9C%BC%EB%A1%9C-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%ED%95%98%EA%B8%B0)
- [[2D 메타볼 애니메이션 구현] 8. 메타볼 융합 구현하기 (최적화 이전 - 최종)](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-8.-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%9C%B5%ED%95%A9-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EC%B5%9C%EC%A0%81%ED%99%94-%EC%9D%B4%EC%A0%84-%EC%B5%9C%EC%A2%85)
- [[2D 메타볼 애니메이션 구현] 9. 메타볼 융합 로직 최적화하기 (End)](https://velog.io/@young_pallete/2D-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84-8.-%EB%A9%94%ED%83%80%EB%B3%BC-%EC%9C%B5%ED%95%A9-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0-End)

## 퍼포먼스 결과

새로고침 이후 아무것도 하지 않고, 바로 성능 측정을 10초간 한 결과입니다.

### 최적화 이전

알고리즘의 경우 스크립트에서 진행되며, 스크립트의 경우 10초 동안 약 **9387ms** 동안 연산하였습니다.

![최적화 이전](https://velog.velcdn.com/images/young_pallete/post/7da4bc3e-c64d-4103-9c04-27f5004c965d/image.png)

### 최적화 이후

![최적화 이후](https://velog.velcdn.com/images/young_pallete/post/4d1d2a3e-d561-4b21-b7d5-4b5cf5dba9be/image.png)

스크립트의 경우 `165ms`만 발생하여 **약 60배**의 성능 개선을 확인했습니다.

## 기타

- 포스트 글들과 커밋 내역을 보면 알 수 있듯, 다양한 디자인 패턴들을 믹스하여 확장에는 열려 있고 수정에는 최대한 닫혀 있는 설계로 재사용성 높은 컴포넌트를 구현했습니다. 🙆🏻🙆🏻‍♀️
