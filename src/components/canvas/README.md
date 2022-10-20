## 두 점 사이의 거리를 구하기

원의 방정식에 기초하여 두 점 사이의 거리를 구할 수 있다.
만약 두 점 `(a, b)`, `(x, y)`가 있다면

```js
Math.sqrt(Math.pow(x - a, 2) + Math.pow(x - b, 2));
```

## 라디안이란

`radian`은 `180deg`에서 `Math.PI`를 나눈 값이다.
1라디안은 거의 약 57.2958의 값을 가진다.

```js
const RADIAN = 180 / Math.PI;
```

## 삼각함수 사용 시 유의점

자바스크립트에서 일반적인 삼각함수 계산의 단위는, `degree`가 아닌 `radian`이다.
따라서 순수 `degree` 값을 구하고자 하면 변환 공식을 만들어야 한다.

```js
const RADIAN = 180 / Math.PI;

const getDegree = r => {
  return r * RADIAN;
};

getDegree(Math.atan(1)); // 45
```

## 삼각함수

> 다 정리하지는 않는다. 모르는 것일 때마다, 필요할 때마다 작성한다.

### Math.atan

탄젠트의 역함수다. 따라서 탄젠트 값을 갖고 각도를 구하는 데 사용할 수 있다.

```js
console.log(Math.atan(1) * RADIAN); // 45
```

### Math.atan2

이 둘이 헷갈렸는데, `atan2` 메서드는 아예 `0,0`이라는 원 점이 주어졌다고 가정한다.
이때, 원하는 `x`, `y`와의 거리를 기반으로 각도값을 구하는 메서드이다.
주의할 점은, 1번째 인자가 `y`가 먼저 들어간다.

```js
function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

console.log(calcAngleDegrees(5, 5));
//expected output: 45
```
