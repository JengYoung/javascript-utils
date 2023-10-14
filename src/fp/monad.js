/**
 * Promise - 비동기 상황에서 함수 합성을 안전하게.
 *
 * 함수 합성: f(g(x))
 *
 * 상황에 따라 안전하게 합성할 수 있도록 하기 위한 구현체가 모나드.
 * 자바스크립트 - 동적 타이핑 언어, 타입을 중점적으로 사용하지 않기 때문에 대수구조가 잘 묻어나지 않는 경향.
 *
 * 직접적으로 모나드를 이용한 사용자 정의 개체를 만들면서 하지는 않음.
 * 모나드를 굳이 설명할 필요는 없으나 알고 있으면 안전한 함수형 프로그래밍 할 때 좋은 사고와 응용력 가질 수 있음.
 *
 * 자바스크립트에서도 직접적으로 모나드를 이야기하지는 않지만,
 * array, promise를 통해 모나드가 무엇인지 알 수 있고 함수합성에서의 안전성
 *
 * 모나드는 일종의 박스.
 * 값이 들어있는 것.
 * 컨테이너에는 값이 들어있고, 함수합성을 안전하게 하는 것.
 */

const g = a => a + 1;
const f = a => a * a;

[1].map(g).map(f);

/**
 * map이라는 함수 - g, f를 연속적으로 실행하도록 함.
 * 이때 array라는 값은 필요한 값은 아님.
 * 실제 결론은 "array라는 값이 어떻게 변했는지"
 *
 * 컨테이너 안에 있는 값이 어떤 값이 되느냐가 쓸모있는 값.
 * 결과적으로 일련의 합성을 통해 외부세상에 효과를 만들어내는 값을 만들어냄.
 *
 * 이러한 함수의 이점은 안전하게 합성을 해준다는 것.
 * 실제로 forEach에서는 빈 Array를 체인했을 때 아무 효과도 일어나지 않음.
 * 사용자에게 필요한 값을 전달한다는 것이 핵심이지, 그 외의 부수효과(에러)를 만들어내지 않도록 함.
 */
